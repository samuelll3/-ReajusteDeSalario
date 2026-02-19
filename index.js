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
app.listen(port,()=>{  
    console.log(`Servidor rodando: http://localhost:${port}/`);
})
//outra rota

