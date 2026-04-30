// ══════════════════════════════════════════════════════════════════════════════
// 🔗 INTEGRAÇÃO FRONTEND + BACKEND
// ══════════════════════════════════════════════════════════════════════════════

// Arquivo: src/api.js (criar na pasta src)
// Este arquivo centraliza todas as chamadas para o backend

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// ─── ARMAZENAR TOKEN ───────────────────────────────────────────────────────────
const getToken = () => localStorage.getItem('agj_token');
const setToken = (token) => localStorage.setItem('agj_token', token);
const clearToken = () => localStorage.removeItem('agj_token');

// ─── HEADERS PADRÃO ────────────────────────────────────────────────────────────
const getHeaders = () => ({
  'Content-Type': 'application/json',
  ...(getToken() && { 'Authorization': `Bearer ${getToken()}` })
});

// ─── AUTENTICAÇÃO ──────────────────────────────────────────────────────────────

/**
 * Login do usuário
 * @param {string} email - Email institucional
 * @param {string} password - Senha
 * @returns {Promise<{token, user}>}
 */
export async function loginAPI(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erro no login');
  }

  const data = await response.json();
  setToken(data.token);
  return data;
}

/**
 * Logout
 */
export function logoutAPI() {
  clearToken();
}

// ─── POSTAGENS ─────────────────────────────────────────────────────────────────

/**
 * Listar postagens
 * @param {string} status - 'publicado' ou 'rascunho' (opcional)
 */
export async function fetchPosts(status = null) {
  const url = new URL(`${API_URL}/posts`);
  if (status) url.searchParams.append('status', status);

  const response = await fetch(url, {
    headers: getHeaders()
  });

  if (!response.ok) throw new Error('Erro ao buscar postagens');
  return response.json();
}

/**
 * Criar nova postagem (apenas Professor/Admin)
 */
export async function createPost(post) {
  const response = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(post)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erro ao criar postagem');
  }

  return response.json();
}

/**
 * Atualizar postagem
 */
export async function updatePost(id, post) {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(post)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erro ao atualizar postagem');
  }

  return response.json();
}

/**
 * Deletar postagem
 */
export async function deletePost(id) {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erro ao deletar postagem');
  }

  return response.json();
}

/**
 * Incrementar visualizações
 */
export async function incrementPostView(id) {
  await fetch(`${API_URL}/posts/${id}/view`, {
    method: 'POST',
    headers: getHeaders()
  }).catch(() => {}); // Falha silenciosa se não funcionar
}

/**
 * Curtir postagem
 */
export async function likePost(id) {
  const response = await fetch(`${API_URL}/posts/${id}/like`, {
    method: 'POST',
    headers: getHeaders()
  });

  if (!response.ok) throw new Error('Erro ao curtir');
  return response.json();
}

// ─── COMENTÁRIOS ───────────────────────────────────────────────────────────────

/**
 * Criar comentário
 */
export async function createComment(comment) {
  const response = await fetch(`${API_URL}/comments`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(comment)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erro ao comentar');
  }

  return response.json();
}

/**
 * Aprovar comentário (apenas Admin)
 */
export async function approveComment(id) {
  const response = await fetch(`${API_URL}/comments/${id}/approve`, {
    method: 'PUT',
    headers: getHeaders()
  });

  if (!response.ok) throw new Error('Erro ao aprovar comentário');
  return response.json();
}

// ─── FEEDBACKS ─────────────────────────────────────────────────────────────────

/**
 * Enviar feedback (qualquer pessoa)
 */
export async function sendFeedback(feedback) {
  const response = await fetch(`${API_URL}/feedbacks`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(feedback)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erro ao enviar feedback');
  }

  return response.json();
}

// ─── USUARIOS ──────────────────────────────────────────────────────────────────

/**
 * Criar novo usuário (apenas Admin)
 */
export async function createUser(user) {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(user)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erro ao criar usuário');
  }

  return response.json();
}

// ─── HEALTH CHECK ─────────────────────────────────────────────────────────────

export async function checkBackendHealth() {
  try {
    const response = await fetch(`${API_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXEMPLO DE USO EM COMPONENTES
// ═══════════════════════════════════════════════════════════════════════════════

/*

// ─── Login Component ────────────────────────────────────────────────────────

import { loginAPI } from './api';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { token, user } = await loginAPI(email, password);
      onLogin({ ...user, token });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button>
    </form>
  );
};


// ─── Posts Component ────────────────────────────────────────────────────────

import { fetchPosts, createPost } from './api';

const PostsAdmin = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: '', content: '', status: 'rascunho' });
  const [loading, setLoading] = useState(true);

  // Carregar postagens
  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (err) {
        console.error('Erro ao carregar posts:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  // Criar postagem
  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const newPost = await createPost({
        ...form,
        category: form.category || 'Institucional',
        author_id: user.id
      });
      setPosts([newPost, ...posts]);
      setForm({ title: '', content: '', status: 'rascunho' });
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <h2>Minhas Postagens</h2>

      <form onSubmit={handleCreatePost} style={{ marginBottom: 20 }}>
        <input 
          value={form.title} 
          onChange={(e) => setForm({...form, title: e.target.value})}
          placeholder="Título da postagem"
          required
        />
        <textarea 
          value={form.content}
          onChange={(e) => setForm({...form, content: e.target.value})}
          placeholder="Conteúdo"
          required
        />
        <select value={form.status} onChange={(e) => setForm({...form, status: e.target.value})}>
          <option value="rascunho">Rascunho</option>
          <option value="publicado">Publicar Agora</option>
        </select>
        <button type="submit">Salvar Postagem</button>
      </form>

      <div style={{ display: 'grid', gap: 10 }}>
        {posts.map(post => (
          <div key={post.id} style={{ border: '1px solid #ccc', padding: 10 }}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <span style={{ fontSize: 12, color: '#666' }}>
              Status: <strong>{post.status}</strong> | 
              Views: {post.views} | 
              Likes: {post.likes}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};


// ─── Arquivo .env do Frontend ──────────────────────────────────────────────

// .env (na raiz do projeto React)
REACT_APP_API_URL=http://localhost:5000/api

// Em produção:
REACT_APP_API_URL=https://seu-dominio.com/api

*/

// ═══════════════════════════════════════════════════════════════════════════════
// 📝 CONFIGURAÇÃO NO ARQUIVO APP.JSX
// ═══════════════════════════════════════════════════════════════════════════════

/*

// Adicione estas importações no topo do seu App.jsx:
import { 
  loginAPI, 
  fetchPosts, 
  createPost, 
  updatePost, 
  deletePost,
  createComment,
  sendFeedback,
  createUser,
  logoutAPI
} from './api';

// No seu componente de Login:
const handleLogin = async (email, password) => {
  try {
    const { token, user } = await loginAPI(email, password);
    setUser(user);
    setPage("home");
  } catch (err) {
    setError(err.message);
  }
};

// No seu componente Home, carregue as postagens:
useEffect(() => {
  async function loadPosts() {
    try {
      const data = await fetchPosts('publicado');
      setPosts(data);
    } catch (err) {
      console.error(err);
    }
  }
  loadPosts();
}, []);

// No Admin Posts Component:
const handleCreatePost = async (postData) => {
  try {
    const newPost = await createPost(postData);
    setPosts([newPost, ...posts]);
  } catch (err) {
    showToast(err.message, 'error');
  }
};

// No logout:
const handleLogout = () => {
  logoutAPI();
  setUser(null);
  setPage("login");
};

*/

// ═══════════════════════════════════════════════════════════════════════════════
// 🔐 TRATAMENTO DE ERROS AUTOMÁTICO
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Middleware de fetch com tratamento automático de erros
 */
export async function fetchWithErrorHandling(url, options = {}) {
  const defaultHeaders = getHeaders();
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: { ...defaultHeaders, ...options.headers }
    });

    if (response.status === 401) {
      // Token expirado, fazer logout
      clearToken();
      window.location.href = '/login';
      throw new Error('Sessão expirada. Faça login novamente.');
    }

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `Erro ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error('Erro na requisição:', err);
    throw err;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 📊 EXEMPLO: NOTIFICAÇÃO DE NOVA POSTAGEM
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Monitorar novas postagens (simular com polling)
 * Em produção, usar WebSockets para tempo real
 */
export function monitorNewPosts(onNewPost, interval = 30000) {
  const checkPosts = async () => {
    try {
      const posts = await fetchPosts('publicado');
      const lastCheck = localStorage.getItem('last_post_check');
      
      posts.forEach(post => {
        const postTime = new Date(post.created_at).getTime();
        if (!lastCheck || postTime > parseInt(lastCheck)) {
          onNewPost(post);
        }
      });

      localStorage.setItem('last_post_check', Date.now().toString());
    } catch (err) {
      console.error('Erro ao verificar postagens:', err);
    }
  };

  checkPosts(); // verificação inicial
  return setInterval(checkPosts, interval);
}

// Uso no componente Aluno:
// useEffect(() => {
//   const intervalId = monitorNewPosts((post) => {
//     showNotification(`Nova postagem: ${post.title}`, 'info');
//     // Adicionar aos notifications do usuário
//   }, 60000); // verificar a cada minuto
//
//   return () => clearInterval(intervalId);
// }, []);
