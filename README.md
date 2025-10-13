
## Estrutura de páginas do frontend

O sistema foi organizado em páginas separadas por funcionalidade:

- **/home:** página inicial com dois botões principais — "Cadastrar novo contato" e "Visualizar contatos" — para direcionar o usuário rapidamente.  
- **/list:** página exclusiva para visualizar todos os contatos, com paginação e ações de editar/excluir.  
- **/add:** página dedicada para criar um novo contato, mantendo o formulário limpo e focado.  
- **/edit:** página dedicada para editar um contato existente, reutilizando o mesmo formulário da criação, mas preenchido com os dados atuais.

### Justificativa

- separação clara de responsabilidades por página facilita manutenção e navegação  
- mantém o fluxo de usuário simples e previsível  
- evita sobrecarregar uma única página com múltiplas funções

---

## Campos `createdAt` e `updatedAt`

Esses campos existem apenas no banco de dados e **não são mostrados ao usuário final**.

### Por quê?

- servem para controle interno: saber quando o registro foi criado ou modificado  
- não precisam ser expostos, evitando poluir a interface  
- são atualizados automaticamente pelo backend em todas as operações de CRUD

---

## Formato de Telefone

Atualmente, o sistema utiliza o **padrão brasileiro de telefone**: `(99) 99999-9999`, que já abstrai o código `+55`.  

- A escolha foi feita para facilitar a validação e formatação automática no frontend.  
- Garante feedback visual imediato caso o usuário digite um número inválido.  
- Simplifica a lógica de máscara e validação.

### Aceitando números internacionais

Para permitir qualquer padrão de telefone:  

1. Remover ou substituir a regex de validação:
```ts
const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
```

2. Remover ou adaptar a função de formatação:

```ts
const formatPhone = (value: string) => { ... };
```

3. Remover a verificação de quantidade de dígitos:

```ts
if (raw.length > 0 && !(raw.length === 11)) {
  setPhoneError("Número incompleto");
}
```

 Com essas alterações, o campo de telefone aceitará qualquer sequência de números, símbolos ou sinais (+, espaços, hífen etc.). A validação passa a ser opcional, e a responsabilidade de digitação correta fica com o usuário ou com o backend.

 ---

## Documentando o uso de Inteligência Artificial
### Geração do schema
A IA foi utilizada para gerar o conteúdo do arquivo ```prisma/schema.prisma```, o qual foi verificado posteriormente para garantir corretude.
### Geração de seed
A lista de contatos foi gerada com o auxílio de IA, que sugeriu nomes, emails e números de telefone fictícios. Todo o conteúdo gerado foi revisado.

---

## Créditos / Referências

Tutorial de frontend inspirado por [Matheus Fraga](https://www.youtube.com/watch?v=JlYrbEBZ3PE) no YouTube.