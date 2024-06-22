Utilizando a API que escolheu, desenvolva uma aplicação utilizando Nest JS com as seguintes funcionalidades:

- [ ] Crie uma entidade e uma rota para "baixar" pelo menos 50 items para sua base dados da API escolhida pelo time
- [ ] Crie todas as operações de CRUD para a entidade anterior, para que os dados sejam cadastrados, atualizados, listados e removidos via métodos HTTP.
- [ ] Crie uma entidade de usuário, e crie um sistema de cadastro e autenticação via JWT (crie todos os métodos de CRUD para o usuário, a senha do usuário deve ser criptografada)
- [ ] Adicione um Auth Guard para as rotas da entidade principal da sua aplicação, somente usuários autenticados poderão chamar essas rotas
- [ ] Crie uma entidade para logar o tempo de resposta das rotas de sua API. Registre pelo menos o nome da rota chamada, o método utilizado e quanto tempo demorou para a solicitação terminar.
- [ ] Adicione Exceções a todos os métodos de sua controller, sendo que pelo menos uma delas deve ser de uma classe personalizada
- [ ] Adicione validações de dados via class-validator
- [ ] Crie um arquivo docker compose para sua aplicação, onde pelo menos o banco de dados seja levantado para utilizar a aplicação
- [ ] Realize os testes de integração e também faça o teste de carga e salve o relatório
- [ ] Exporte as requisições da sua aplicação para um arquivo .json e anexe a sua entrega