# Self-ServiceDigital - Plataforma de E-commerce

Uma plataforma moderna de e-commerce para agência de desenvolvimento criada com Next.js 16, React 19 e Tailwind CSS.

## ✨ Funcionalidades Implementadas

### 1. **Carrinho de Compras** 🛒
- Adicionar/remover itens
- Atualizar quantidades
- Cálculo automático de impostos (10%)
- Aplicação de descontos
- Persistência de dados no localStorage com Zustand

### 2. **Sistema de Autenticação** 🔐
- Login/Registro de usuários
- Armazenamento seguro de tokens
- Proteção de rotas admin
- Persistência de sessão

### 3. **Processamento de Pagamento** 💳
- Integração simulada com Stripe
- Suporte a múltiplos métodos: Cartão, PIX, Boleto
- Criação de intenções de pagamento
- Webhook de confirmação

### 4. **Gerenciamento de Pedidos** 📦
- Criação de pedidos após checkout
- Página de confirmação detalhada
- Armazenamento de histórico
- Status de pedidos

### 5. **Formulário de Contato** 💬
- Captura de mensagens de clientes
- Validação de email
- Suporte a diferentes assuntos
- Armazenamento em banco de dados simulado

### 6. **Painel Administrativo** ⚙️
- Dashboard com estatísticas
- Visualização de pedidos
- Gerenciamento de mensagens
- Configurações do sistema

### 7. **Catálogo Interativo** 📋
- Seleção de tipo de projeto (Web, Android, Sistema)
- Configuração de páginas e extras
- Cálculo de preço em tempo real
- Integração com carrinho e WhatsApp

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone [seu-repo]
cd nome-da-pasta

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O aplicativo estará disponível em `http://localhost:3000`

## 📱 Páginas Principais

| Página | Rota | Descrição |
|--------|------|-----------|
| Home | `/` | Página inicial com catálogo |
| Login | `/login` | Autenticação de usuários |
| Registro | `/signup` | Criar nova conta |
| Carrinho | `/carrinho` | Visualizar itens do carrinho |
| Checkout | `/checkout` | Finalizar compra |
| Confirmação | `/pedido-confirmado/[id]` | Confirmação de pedido |
| Admin | `/admin` | Painel administrativo |
| Perfil | `/perfil` | Perfil do usuário |
| Pedidos | `/meus-pedidos` | Histórico de pedidos |

## 🔑 Credenciais de Teste

### Admin
- **Email:** admin@example.com
- **Senha:** admin123

## 📦 Dependências Principais

```json
{
  "next": "16.2.2",
  "react": "19.2.4",
  "react-dom": "19.2.4",
  "zustand": "^4.x",
  "stripe": "^14.x",
  "axios": "^1.x",
  "bcryptjs": "^2.x",
  "tailwindcss": "^4"
}
```

## 📝 Estrutura do Projeto

```
app/
├── api/                               # Rotas API
├── _components/
│   ├── atoms/                         # Blocos básicos de UI
│   ├── molecules/                     # Composições pequenas de atoms
│   ├── organisms/                     # Seções complexas (Navbar, Footer, Catalog...)
│   ├── templates/                     # Estruturas de página (HomeShell, PageShell)
│   └── views/                         # Páginas de UI (LoginPage, CheckoutPage...)
├── _features/
│   ├── auth/                          # Estado e regras de autenticação
│   ├── cart/                          # Estado e regras do carrinho
│   └── quote/                         # Schema, pricing e store de orçamento
├── _lib/                              # Infra compartilhada
├── _pages/                            # Implementação central das páginas
├── _routes/                           # Registry de rotas
├── _types/                            # Tipos TypeScript
├── layout.tsx
├── page.tsx
└── globals.css
```

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env.local`:

```env
NEXT_PUBLIC_STRIPE_KEY=seu_stripe_key_aqui
NEXT_PUBLIC_API_URL=http://localhost:3000
SMTP_USER=seu_email_smtp
SMTP_PASS=sua_senha_smtp
```

## 🎨 Customização

### Cores
O projeto usa Tailwind CSS com tema escuro customizado:
- **Primary:** Cyan (#06b6d4)
- **Background:** #040b1f
- **Secondary:** Slate

### Serviços e Preços
Edite em `app/lib/data.ts`:

```typescript
export const catalogItems = [
  { id: "header", label: "Header / Menu responsivo", price: 300 },
  // ... adicione mais serviços
];
```

## 🚢 Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Docker
Crie um `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📋 Checklist de Implementação

- [x] Estrutura base com Zustand
- [x] Carrinho de compras funcional
- [x] Sistema de autenticação
- [x] Processamento de pagamento (simulado)
- [x] Formulário de contato
- [x] Página de checkout
- [x] Painel administrativo
- [ ] Integração real com Stripe
- [ ] Envio real de emails
- [ ] Banco de dados PostgreSQL/MongoDB
- [ ] Autenticação com JWT
- [ ] Rate limiting
- [ ] Testes automatizados

## 🐛 Reportar Problemas

Se encontrar bugs ou tiver sugestões:

1. Abra uma issue no GitHub
2. Descreva o problema detalhadamente
3. Inclua print ou código de erro

## 📚 Documentação Adicional

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand](https://github.com/pmndrs/zustand)
- [Stripe Docs](https://stripe.com/docs)

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.

## 👥 Autor

**Self-ServiceDigital**
- WhatsApp: +55 (24) 99834-4324
- Email: contato@selfservicedigital.com

---

**Última atualização:** Abril 2026
