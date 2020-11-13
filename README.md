# Mapping system features

### Recuperação de senha

**RF** <!-- functional requirements -->

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar a sua senha;

**RNF** <!-- non-functional requirements -->

- Utilizar Mailtrap para testar envios de e-mail em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mail deve acontecer em segundo plano (background job);

**RN** <!-- business rules -->

- O link enviado por e-mail para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha depois de resetada;

### Atualização de perfil

**RF** <!-- functional requirements -->

- O usuário deve poder atualizar seu nome, email e senha;

**RN** <!-- business rules -->

- O usuário não poder alterar seu e-mail para um já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

### Painel do prestador

**RF** <!-- functional requirements -->

- O prestador deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF** <!-- non-functional requirements -->

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN** <!-- business rules -->

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

### Agendamento de serviços

**RF** <!-- functional requirements -->

- O usuário deve poder listar todos prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelos um horário disponível de um prestador;
- O usuário deve poder listar os horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF** <!-- non-functional requirements -->

- A listagem de prestadores deve ser armazenada em cache;

**RN** <!-- business rules -->

- Cada agendamento deve durar exatamente 1h;
- Os agendamentos devem estar disponíveis entre 8h ás 18h (Primeiro às 8h, último às 17h);
- O usuário não pode agendar em um horário já oculpado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;
