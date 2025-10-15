# README do Projeto

Este README apresenta as escolhas de projeto, justificativas e considerações de engenharia para a aplicação, além de documentar o uso de Inteligência Artificial no processo de desenvolvimento.

## 🚀 Como Executar

Para instruções detalhadas sobre como executar o projeto, consulte [Como executar](como_executar.md).

## 💡 Escolhas de Projeto e Justificativas

### Estrutura de Páginas do Frontend

O frontend é organizado em páginas dedicadas para cada funcionalidade (`/home`, `/list`, `/add`, `/edit`), promovendo **separação de responsabilidades**, **facilidade de manutenção** e **navegação intuitiva**.

### Validação e Formulários: Zod

Uso do **Zod** para validação de dados devido à sua **integração nativa com TypeScript**, **geração automática de tipos** a partir de schemas e **API simples**, garantindo consistência e reduzindo erros.

### Banco de Dados: Prisma

**Prisma** foi escolhido como ORM por ser **moderno**, oferecer **tipagem automática**, **autocompletar**, **migrações simplificadas** e **melhor integração com TypeScript** em comparação a alternativas como Knex ou TypeORM.

### Campos `createdAt` e `updatedAt`

Estes campos são para **controle interno** no banco de dados e **não são expostos ao usuário final**, evitando poluir a interface e garantindo o registro automático de criação e modificação.

### Formato de Telefone

O sistema adota o **padrão brasileiro de telefone** `(99) 99999-9999` para **facilitar validação e formatação automática** no frontend. Para aceitar números internacionais, seria necessário remover ou adaptar a regex de validação e a função de formatação.

## ⚙️ Spec Engineering

Esta seção detalha as assunções e decisões de projeto.

### Assunções Explícitas

- **Paginação Padrão:** A paginação segue um modelo `page` e `pageSize` simples, com `pageSize` padrão de 10.

- **Formato de Telefone:** O formato `(99) 99999-9999` é o único aceito para validação inicial, abstraindo o código `+55`.

- **Unicidade de Email:** Emails são únicos por contato, garantindo que cada usuário tenha um identificador exclusivo.

### Decisões de Arquitetura

- **Decisão:** Usar Prisma para ORM.
  - **Alternativas:** Knex, TypeORM.
  - **Motivo:** Tipagem forte, autocompletar, migrações automáticas e melhor integração com TypeScript moderno.
  - **Consequência:** Menor flexibilidade para queries SQL raw complexas, mas ganho significativo em produtividade e segurança de tipos.

- **Decisão:** Usar Zod para validação de dados.
  - **Alternativas:** Yup.
  - **Motivo:** Integração total com TypeScript, geração de tipos a partir de schemas, API concisa.
  - **Consequência:** Curva de aprendizado inicial para quem não está familiarizado com a sintaxe de schemas, mas ganho em robustez e consistência.

## 🌐 Context Engineering

Considerações sobre escalabilidade, confiabilidade e evolução do sistema.

### Escalabilidade: E se houver 1 milhão de contatos?

- **Problema Potencial:** Consultas de listagem simples podem ficar lentas à medida que o volume de dados cresce.

- **Estratégias:**
  - **Indexação:** Criar índices no banco de dados para campos de busca (nome, email).
  - **Cache:** Implementar cache em memória (Redis) pra consultas frequentes.
  - **Paginação Eficiente:** A paginação atual já ajuda, mas para volumes muito grandes, pode-se pensar em usar `keyset pagination`.
  - **Particionamento:** Avaliar particionamento de dados para bancos de dados massivos.

## 🧠 Prompt Engineering

O desenvolvimento deste projeto contou com o auxílio de Inteligência Artificial (IA) como copiloto, acelerando diversas etapas.

### Como a IA foi utilizada

- **Geração de Schema:** A IA foi utilizada para gerar o conteúdo inicial do arquivo `prisma/schema.prisma`, que foi posteriormente revisado e ajustado manualmente.

- **Geração de Seed:** A lista de contatos fictícios para popular o banco de dados (`seed`) foi gerada com o auxílio da IA, que sugeriu nomes, emails e números de telefone. Todo o conteúdo foi revisado para garantir a adequação.

- **Auxílio em Testes e Validações:** A IA ajudou a compreender conceitos de validação, paginação e CRUD, além de sugerir padrões de tipagem TypeScript e exemplos de chamadas API para testes.

---

### Prompts 

```
"Gere um schema Prisma para uma entidade 'Contact' com campos para id, nome, email (único), telefone e timestamps (createdAt e updatedAt) de criação e atualização."
```

```
"Gere um seed.ts com 10 contatos fictícios para Prisma, cada um com nome, email único e telefone opcional no formato brasileiro."
```

### Checklist de Revisão Manual

Após a geração por IA, todo o conteúdo foi submetido a um checklist:

- **Tipagem:** Verificação da corretude e consistência dos tipos TypeScript.

- **Segurança:** Análise de vulnerabilidades e boas práticas de segurança.

- **Erros:** Teste de cenários de erro e tratamento adequado.

- **Corretude:** Validação da lógica de negócio e funcionalidade.

# Nota sobre este documento

Este guia foi revisado e otimizado com o auxílio de Inteligência Artificial para garantir clareza e concisão.

# Créditos / Referências

- Tutorial de frontend inspirado por [Matheus Fraga](https://www.youtube.com/watch?v=JlYrbEBZ3PE) no YouTube.
