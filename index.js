import express from "express";
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.get("/", (requisicao, reposta) => {
  const codehtml = `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Reajuste de Salário</title>
</head>
<body>

    <h2>Consulta de Reajuste de Salário</h2>
    <p><strong>Matrícula:</strong> {{matricula}}</p>
    <p><strong>Idade:</strong> {{idade}}</p>
    <p><strong>Sexo:</strong> {{sexo}}</p>
    <p><strong>Salário Base:</strong> R$ {{salario_base}}</p>
    <p><strong>Ano de Contratação:</strong> {{anoContratacao}}</p>

    <h3>Resultado do Reajuste</h3>
    <p><strong>Percentual Aplicado:</strong> {{percentual}}%</p>
    <p><strong>Valor do Reajuste:</strong> R$ {{valor_reajuste}}</p>
    <p><strong>Novo Salário:</strong> R$ {{novo_salario}}</p>
    <h3>Exemplo</h3>
    <p>http://localhost:3000/calcular?idade=25&sexo=M&salario_base=20&anoContratacao=2000&matricula=1</p>
</body>
</html>`;
  reposta.send(codehtml);
});
//outra rota
app.get("/calcular", (requisicao, resposta) => {
  const idade = Number(requisicao.query.idade);
  const sexo = requisicao.query.sexo;
  const salario_base = Number(requisicao.query.salario_base);
  const anoContratacao = Number(requisicao.query.anoContratacao);
  const matricula = Number(requisicao.query.matricula);
  const ano_atual = 2026;
  const tempo_empresa = ano_atual - anoContratacao;
  let novo_salario = 0;
  let salarioreajuste = 0;

  if (isNaN(idade) && idade < 16) {
    return resposta.send(`<h1> erro </h1>
            <p> Idade não é valido `);
  }

  if (isNaN(salario_base)) {
    return resposta.send(`<h1> erro </h1>
            <p> Salário base não é valido `);
  }

  if (
    isNaN(anoContratacao) ||
    !Number.isInteger(anoContratacao) ||
    anoContratacao < 1960
  ) {
    return resposta.send(`<h1> erro </h1>
            <p> Ano de contratação não é valido `);
  }

  if (isNaN(matricula) || !Number.isInteger(matricula) || matricula < 0) {
    return resposta.send(`<h1> erro </h1>
            <p> Matricula não é valido `);
  }

  if (sexo !== "m" && sexo !== "M" && sexo !== "f" && sexo !== "F") {
    return resposta.send(`<h1> erro </h1>
            <p> Sexo inválido`);
  }

  if (idade >= 18 && idade <= 39) {
    if (sexo == "m" || sexo == "M") {
      salarioreajuste = salario_base * 1.1;
      if (tempo_empresa <= 10) {
        novo_salario = salarioreajuste - 10;
      } else {
        novo_salario = salarioreajuste + 17;
      }
    } else if (sexo == "f" || sexo == "F") {
      salarioreajuste = salario_base * 1.08;
      if (tempo_empresa <= 10) {
        novo_salario = salarioreajuste - 11;
      } else {
        novo_salario = salarioreajuste + 16;
      }
    }
  }
  //2 condicao tabela
  if (idade >= 40 && idade <= 69) {
    if (sexo == "m" || sexo == "M") {
      salarioreajuste = salario_base * 1.08;
      if (tempo_empresa <= 10) {
        novo_salario = salarioreajuste - 5;
      } else {
        novo_salario = salarioreajuste + 15;
      }
    } else if (sexo == "f" || sexo == "F") {
      salarioreajuste = salario_base * 1.1;
      if (tempo_empresa <= 10) {
        novo_salario = salarioreajuste - 7;
      } else {
        novo_salario = salarioreajuste + 14;
      }
    }
  }
  //3 condicao tabela
  if (idade >= 70 && idade <= 99) {
    if (sexo == "m" || sexo == "M") {
      salarioreajuste = salario_base * 1.15;
      if (tempo_empresa <= 10) {
        novo_salario = salarioreajuste - 15;
      } else {
        novo_salario = salarioreajuste + 13;
      }
    } else if (sexo == "f" || sexo == "F") {
      salarioreajuste = salario_base * 1.17;
      if (tempo_empresa <= 10) {
        novo_salario = salarioreajuste - 17;
      } else {
        novo_salario = salarioreajuste + 12;
      }
    }
  }
  resposta.send(`<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Resultado do Reajuste Salarial</title>
</head>
<body>

    <h2>Dados do Funcionário</h2>

    <p><strong>Matrícula:</strong> ${matricula}</p>
    <p><strong>Idade:</strong> ${idade}</p>
    <p><strong>Sexo:</strong> ${sexo}</p>
    <p><strong>Salário Base:</strong> R$ ${salario_base}</p>
    <p><strong>Ano de Contratação:</strong> ${anoContratacao}</p>
    <p><strong>Ano Atual:</strong> 2026</p>
    <p><strong>Tempo de Empresa:</strong> ${tempo_empresa} anos</p>

    <h2>Reajuste Salarial</h2>

    <p><strong>Valor do Reajuste:</strong> R$ ${salarioreajuste}</p>
    <p><strong>Novo Salário:</strong> R$ ${novo_salario}</p>

</body>
</html>`);
});
app.listen(port, () => {
  console.log(`Servidor rodando: http://localhost:${port}/`);
});
