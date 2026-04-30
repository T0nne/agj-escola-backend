// ══════════════════════════════════════════════════════════════════════════════
// 🎓 SERVER.JS SIMPLIFICADO PARA INICIANTE
// Para iniciantes: este arquivo é bem comentado
// ══════════════════════════════════════════════════════════════════════════════

// Importar bibliotecas
const express = require('express');
const pg = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config(); // Carregar variáveis do .env

// ─── CRIAR APLICAÇÃO ──────────────────────────────────────────────────────────
const app = express();

// Middleware (configurações de tratamento de requisições)
app.use(express.json()); // Aceitar JSON
app.use(cors({ // Permitir requisições do frontend
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// ─── CONECTAR AO BANCO DE DADOS ────────────────────────────────────────────────
const pool = new pg.Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'agj_school'
});

// Se a conexão falhar
pool.on('error', (err) => {
  console.error('❌ Erro na conexão do BD:', err);
});

// Testar conexão
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Não conseguiu conectar no BD!');
    console.error('Verifique o arquivo .env');
  } else {
    console.log('✅ BD conectado com sucesso!');
  }
});

// ─── MIDDLEWARE DE AUTENTICAÇÃO ────────────────────────────────────────────────
// Este função verifica se o usuário tem um token válido
const verificarToken = (req, res, next) => {
  // Pegar o token do header "Authorization: Bearer TOKEN"
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Sem token de autenticação' });
  }

  try {
    // Verificar se o token é válido
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.userId = decoded.userId;
    req.userEmail = decoded.email;
    req.userType = decoded.type;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token expirado ou inválido' });
  }
};

// ─── ROTAS (Endpoints da API) ──────────────────────────────────────────────────

// 1. LOGIN - Usuário faz login com email e senha
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar se email e senha foram enviados
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    // Buscar usuário no banco
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email.toLowerCase()]
    );

    // Se não encontrou usuário
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }

    const user = result.rows[0];

    // Gerar um JWT token (simular login)
    // Em produção real, compararia bcrypt.compare(password, user.password_hash)
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name,
        type: user.type
      },
      process.env.JWT_SECRET || 'seu-secret-super-seguro',
      { expiresIn: '7d' } // Token válido por 7 dias
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        type: user.type
      }
    });
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

// 2. LISTAR POSTAGENS - GET /api/posts
app.get('/api/posts', async (req, res) => {
  try {
    const { status } = req.query; // ?status=publicado ou ?status=rascunho

    let query = 'SELECT * FROM posts ORDER BY created_at DESC';
    const params = [];

    if (status) {
      query = 'SELECT * FROM posts WHERE status = $1 ORDER BY created_at DESC';
      params.push(status);
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar posts:', err);
    res.status(500).json({ error: 'Erro ao buscar postagens' });
  }
});

// 3. CRIAR POSTAGEM - POST /api/posts (apenas professor/admin)
app.post('/api/posts', verificarToken, async (req, res) => {
  try {
    // Verificar se é professor ou admin
    if (!['Professor', 'Administrador'].includes(req.userType)) {
      return res.status(403).json({ error: 'Sem permissão para criar postagens' });
    }

    const { title, content, category, cover_url, status, featured } = req.body;

    // Validar campos obrigatórios
    if (!title || !content) {
      return res.status(400).json({ error: 'Título e conteúdo são obrigatórios' });
    }

    // Inserir postagem no banco
    const result = await pool.query(
      `INSERT INTO posts (title, content, category, cover_url, status, featured, author_id, views, likes, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 0, 0, NOW(), NOW())
       RETURNING *`,
      [
        title,
        content,
        category || 'Institucional',
        cover_url || null,
        status || 'rascunho',
        featured || false,
        req.userId
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao criar post:', err);
    res.status(500).json({ error: 'Erro ao criar postagem' });
  }
});

// 4. ATUALIZAR POSTAGEM - PUT /api/posts/:id
app.put('/api/posts/:id', verificarToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category, cover_url, status, featured } = req.body;

    const result = await pool.query(
      `UPDATE posts 
       SET title = $1, content = $2, category = $3, cover_url = $4, status = $5, featured = $6, updated_at = NOW()
       WHERE id = $7
       RETURNING *`,
      [title, content, category, cover_url, status, featured, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Postagem não encontrada' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao atualizar post:', err);
    res.status(500).json({ error: 'Erro ao atualizar postagem' });
  }
});

// 5. DELETAR POSTAGEM - DELETE /api/posts/:id
app.delete('/api/posts/:id', verificarToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar se é o autor ou admin
    const post = await pool.query('SELECT author_id FROM posts WHERE id = $1', [id]);
    if (post.rows.length === 0) {
      return res.status(404).json({ error: 'Postagem não encontrada' });
    }

    if (post.rows[0].author_id !== req.userId && req.userType !== 'Administrador') {
      return res.status(403).json({ error: 'Você não pode deletar esta postagem' });
    }

    await pool.query('DELETE FROM posts WHERE id = $1', [id]);
    res.json({ message: 'Postagem deletada com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar post:', err);
    res.status(500).json({ error: 'Erro ao deletar postagem' });
  }
});

// 6. INCREMENTAR VISUALIZAÇÕES - POST /api/posts/:id/view
app.post('/api/posts/:id/view', async (req, res) => {
  try {
    const { id } = req.params;
    
    await pool.query(
      'UPDATE posts SET views = views + 1 WHERE id = $1',
      [id]
    );

    res.json({ message: 'Visualização contabilizada' });
  } catch (err) {
    console.error('Erro ao contar view:', err);
    res.status(500).json({ error: 'Erro ao contar visualização' });
  }
});

// 7. CURTIR POSTAGEM - POST /api/posts/:id/like
app.post('/api/posts/:id/like', async (req, res) => {
  try {
    const { id } = req.params;
    
    await pool.query(
      'UPDATE posts SET likes = likes + 1 WHERE id = $1',
      [id]
    );

    res.json({ message: 'Like adicionado' });
  } catch (err) {
    console.error('Erro ao dar like:', err);
    res.status(500).json({ error: 'Erro ao curtir' });
  }
});

// 8. CRIAR COMENTÁRIO - POST /api/comments
app.post('/api/comments', async (req, res) => {
  try {
    const { post_id, author, text } = req.body;

    if (!post_id || !author || !text) {
      return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
    }

    const result = await pool.query(
      `INSERT INTO comments (post_id, author, text, approved, created_at)
       VALUES ($1, $2, $3, false, NOW())
       RETURNING *`,
      [post_id, author, text]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao criar comentário:', err);
    res.status(500).json({ error: 'Erro ao criar comentário' });
  }
});

// 9. APROVAR COMENTÁRIO - PUT /api/comments/:id/approve (apenas admin)
app.put('/api/comments/:id/approve', verificarToken, async (req, res) => {
  try {
    if (req.userType !== 'Administrador') {
      return res.status(403).json({ error: 'Apenas administradores podem aprovar comentários' });
    }

    await pool.query(
      'UPDATE comments SET approved = true WHERE id = $1',
      [req.params.id]
    );

    res.json({ message: 'Comentário aprovado' });
  } catch (err) {
    console.error('Erro ao aprovar comentário:', err);
    res.status(500).json({ error: 'Erro ao aprovar comentário' });
  }
});

// 10. ENVIAR FEEDBACK - POST /api/feedbacks (qualquer pessoa)
app.post('/api/feedbacks', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const result = await pool.query(
      `INSERT INTO feedbacks (name, email, subject, message, status, created_at)
       VALUES ($1, $2, $3, $4, 'pendente', NOW())
       RETURNING *`,
      [name, email, subject, message]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao enviar feedback:', err);
    res.status(500).json({ error: 'Erro ao enviar feedback' });
  }
});

// 11. CRIAR USUÁRIO - POST /api/users (apenas admin)
app.post('/api/users', verificarToken, async (req, res) => {
  try {
    if (req.userType !== 'Administrador') {
      return res.status(403).json({ error: 'Apenas administradores podem criar usuários' });
    }

    const { email, name, type } = req.body;

    // Hash da senha padrão (em produção, seria mais seguro)
    const passwordHash = await bcrypt.hash('senha123', 10);

    await pool.query(
      'INSERT INTO users (email, name, type, password_hash) VALUES ($1, $2, $3, $4)',
      [email.toLowerCase(), name, type, passwordHash]
    );

    res.status(201).json({ message: 'Usuário criado com sucesso' });
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
    if (err.code === '23505') {
      return res.status(400).json({ error: 'Este email já existe' });
    }
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

// 12. HEALTH CHECK - GET /api/health (verificar se servidor está vivo)
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    timestamp: new Date(),
    database: pool ? 'connected' : 'disconnected'
  });
});

// ─── INICIAR O SERVIDOR ───────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('');
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║  ✅ SERVIDOR RODANDO COM SUCESSO!                     ║');
  console.log(`║  🌐 http://localhost:${PORT}                            ║`);
  console.log(`║  📊 Banco de Dados: ${process.env.DB_NAME || 'agj_school'}            ║`);
  console.log('║  📡 Aguardando requisições...                         ║');
  console.log('╚════════════════════════════════════════════════════════╝');
  console.log('');
  console.log('💡 Dicas:');
  console.log('   • Abra http://localhost:3000 no navegador');
  console.log('   • Login: prof.maria@educacao.ba.gov.br / senha: 123');
  console.log('   • Pressione CTRL+C para parar o servidor');
  console.log('');
});

// ─── TRATAMENTO DE ERROS GLOBAL ────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('❌ Erro não tratado:', err);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// ─── GRACEFUL SHUTDOWN ────────────────────────────────────────────────────────
// Quando pressionar CTRL+C, fechar conexões corretamente
process.on('SIGTERM', () => {
  console.log('\n⏹️  Encerrando servidor...');
  pool.end(() => {
    console.log('✅ Conexão com BD fechada');
    process.exit(0);
  });
});
