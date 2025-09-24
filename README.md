# 📝 ToDo Web (Frontend)

Frontend web para o sistema **ToDo List**, desenvolvido em **React (Vite)** e integrado ao backend em **Node.js + Express + PostgreSQL**.  
Este projeto foi criado para praticar desenvolvimento frontend moderno, seguindo boas práticas de organização de pastas e integração com APIs REST.

---

## 🚀 Tecnologias
- [React](https://react.dev/)  
- [Vite](https://vitejs.dev/)  
- [Axios](https://axios-http.com/) – requisições HTTP  
- [React Icons](https://react-icons.github.io/react-icons/) – ícones prontos  

---

## 📂 Estrutura do projeto

```
todo-web/
  ├── src/
  │   ├── api/           # funções para comunicação com o backend
  │   ├── components/    # componentes reutilizáveis (TodoItem, etc.)
  │   ├── pages/         # páginas principais (Home, etc.)
  │   ├── App.jsx        # ponto inicial da aplicação
  │   └── main.jsx       # renderização do React no DOM
  ├── index.html
  ├── package.json
  └── README.md
```

---

## ⚙️ Configuração do ambiente

1. Clone este repositório:
   ```bash
   git clone https://github.com/DevEmannuelMorais/TODO-WEB.git
   cd todo-web
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o backend rodando em `http://localhost:3000` (veja [ToDo API](https://github.com/DevEmannuelMorais/TODO-API)).

4. Suba o frontend em modo desenvolvimento:
   ```bash
   npm run dev
   ```

5. Acesse no navegador:  
   👉 `http://localhost:5173`

---

## 📌 Funcionalidades

- ➕ Criar nova tarefa  
- 📃 Listar tarefas existentes  
- ✅ Concluir/Desmarcar tarefa  
- ✏️ Editar título da tarefa  
- 🗑️ Deletar tarefa  

---

## 🛠️ Boas práticas aplicadas

- Separação de responsabilidades (**components**, **pages**, **api**)  
- Uso de **hooks** (`useState`, `useEffect`)  
- Consumo de API com Axios  
- Componentização (`TodoItem`) para facilitar manutenção  

---

## 🛡️ Integração com Backend

Este frontend consome a API disponível em:  
👉 `http://localhost:3000/todos`  

Certifique-se de que o backend está rodando e com **CORS habilitado** para `http://localhost:5173`.

---

## 📜 Licença
Este projeto é apenas para fins de estudo.
