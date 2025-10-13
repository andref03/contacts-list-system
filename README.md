# Formato de Telefone

Atualmente, o sistema utiliza o **padrão brasileiro de telefone**: `(99) 99999-9999`, que já abstrai o código `+55`.  

- A escolha foi feita para facilitar a validação e formatação automática no frontend.  
- Garante feedback visual imediato caso o usuário digite um número inválido.  
- Simplifica a lógica de máscara e validação.

## Aceitando números internacionais

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

# Documentando o uso de Inteligência Artificial
## Geração do schema
A IA foi utilizada para gerar o conteúdo do arquivo ```prisma/schema.prisma```, o qual foi verificado posteriormente para garantir corretude.
## Geração de seed
A lista de contatos foi gerada com o auxílio de IA, que sugeriu nomes, emails e números de telefone fictícios. Todo o conteúdo gerado foi revisado.

---

# Créditos / Referências

Tutorial de frontend inspirado por [Matheus Fraga](https://www.youtube.com/watch?v=JlYrbEBZ3PE) no YouTube.