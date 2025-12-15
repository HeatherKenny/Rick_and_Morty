# Rick and Morty Dashboard

Dashboard completo desenvolvido com Angular 17+ seguindo todos os requisitos do desafio.


#  Requisitos Essenciais

1. Projeto Angular com Standalone Components
   - Angular 17+ com arquitetura standalone
   - Organização seguindo boas práticas (core, shared, features)

2. Consumo da API Rick and Morty
   - Integração completa com rickandmortyapi.com
   - Serviço centralizado para todas as requisições

3. Rotas Implementadas
   - `/characters` - Listagem de personagens
   - `/locations` - Listagem de localizações
   - `/episodes` - Listagem de episódios
   - `/characters/:id` - Detalhes do personagem
   - `/profile` - Perfil do usuário
   - `/login` - Página de login

4. Dashboards com Tabelas
   - Colunas: Name, Status, Details
   - Botão "Detalhes" para visualizar informações completas

5. Scroll Infinito
   - Implementado em todas as páginas de listagem
   - Carregamento automático ao chegar no final da página

6. Barra de Pesquisa Persistente
   - Busca compartilhada entre rotas usando RxJS e Signals
   - Debounce de 300ms para otimização

7. Página de Detalhes do Personagem
   - Layout atraente com foto e informações completas

8. Header e Sidebar Completos
   - Logo, toggle sidebar, dropdown com perfil e logout
   - Navegação entre Characters, Locations e Episodes

#  Funcionalidades Extras

- Sistema de autenticação com guards
- Token JWT fake no localStorage
- Página "Meu Perfil" personalizada
- RxJS e Signals para gerenciamento de estado
- Bootstrap 5.3 para design responsivo

#  Instalação e Execução

```bash
npm install
npm start
```

Acesse: http://localhost:4200

# Como Usar

1. Login: Digite qualquer usuário e senha
2. Navegue pela sidebar
3. Use a busca para filtrar
4. Role para carregar mais itens
5. Clique em "Detalhes" para ver informações completas

# Estrutura

```
src/app/
├── core/          # Guards e serviços
├── features/      # Páginas e componentes de features
├── layouts/       # Layout do dashboard
└── shared/        # Componentes compartilhados
```

# Tecnologias

- Angular 17+
- TypeScript 5.2
- RxJS 7.8
- Bootstrap 5.3
- SCSS
- Signals
