import { Box, Container, Typography } from '@mui/material'

const faqItems = [
    {
        question: 'O que e o Livro POG?',
        answer:
            'O Livro Programacao Orientada a Gambiarra e um projeto editorial de humor tecnico sobre caos em software, manutencao dificil, requisitos absurdos, processos falhos e padroes de gambiarra que surgem em projetos reais.',
    },
    {
        question: 'Quem deve ler este livro?',
        answer:
            'O livro e voltado para desenvolvedores, liderancas tecnicas, estudantes e qualquer pessoa que ja tenha convivido com bugs misteriosos, codigo confuso, prazos irreais, decisoes arquiteturais duvidosas e improvisos que viram regra.',
    },
    {
        question: 'O conteudo e tecnico ou humoristico?',
        answer:
            'Os dois. O texto usa satira e exagero como linguagem, mas organiza os exemplos em categorias, tecnicas e padroes que ajudam a reconhecer sintomas reais de degradacao tecnica e operacional em equipes de software.',
    },
    {
        question: 'O livro esta pronto?',
        answer:
            'O projeto continua em evolucao. Ja existem capitulos publicados sobre historia da POG, requisitos, principios, tecnicas e Gambi Design Patterns, e novos trechos sao publicados conforme a escrita avanca.',
    },
]

function AeoContent() {
    return (
        <Box
            component="section"
            sx={{
                backgroundColor: 'background.paper',
                py: 6,
            }}
        >
            <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h2" component="h2" color="primary">
                        O que voce encontra no Livro POG
                    </Typography>
                    <Typography variant="body1">
                        Programacao Orientada a Gambiarra e um livro online sobre o lado caotico do
                        desenvolvimento de software. O objetivo nao e ensinar a programar mal, e sim
                        identificar com clareza os comportamentos, atalhos, desculpas e acidentes de
                        percurso que transformam um projeto comum em uma usina de manutencao cara,
                        retrabalho e sofrimento coletivo. O texto usa humor, mas a estrutura do site foi
                        organizada para servir como referencia de leitura, consulta e citacao sobre
                        gambiarra, requisitos ruins, processos quebrados e padroes de falha recorrentes.
                    </Typography>
                    <Typography variant="body1">
                        Ao longo do livro, cada parte aprofunda um angulo diferente do problema. Ha uma
                        explicacao sobre o que e POG, um mergulho na historia da desgracenca, um conjunto
                        de principios que mostram como a gambiarra se perpetua, capitulos sobre requisitos
                        e contexto organizacional, secoes voltadas para tecnicas especificas e, por fim,
                        um catalogo de Gambi Design Patterns. Essa organizacao ajuda tanto quem quer ler do
                        inicio ao fim quanto quem precisa encontrar um exemplo concreto de problema em
                        arquitetura, processo, modelagem, manutencao ou tomada de decisao tecnica.
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h3" component="h2" color="primary">
                        Principais temas abordados
                    </Typography>
                    <Box component="ul" sx={{ m: 0, pl: 3, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        <Typography component="li" variant="body1">
                            Definicao de Programacao Orientada a Gambiarra e por que ela aparece em times,
                            produtos e processos aparentemente normais.
                        </Typography>
                        <Typography component="li" variant="body1">
                            Historias, analogias e exemplos de requisitos ruins, prazos irreais, acoplamento
                            descontrolado, codigo opaco e manutencao baseada em supersticao.
                        </Typography>
                        <Typography component="li" variant="body1">
                            Tecnicas recorrentes de improviso, como remendos incrementais, monkey patching,
                            versionamento caotico e outras praticas que parecem salvar entregas no curto
                            prazo, mas elevam o custo de evolucao no medio prazo.
                        </Typography>
                        <Typography component="li" variant="body1">
                            Um catalogo de Gambi Design Patterns que ajuda a nomear anti-padroes e sintomas
                            reais de degradacao tecnica para facilitar diagnostico, conversa e priorizacao.
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h3" component="h2" color="primary">
                        Como usar este site
                    </Typography>
                    <Box component="ol" sx={{ m: 0, pl: 3, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        <Typography component="li" variant="body1">
                            Comece pela pagina de capitulos se quiser uma visao geral da estrutura do livro e
                            navegar pela ordem editorial.
                        </Typography>
                        <Typography component="li" variant="body1">
                            Use o blog para acompanhar atualizacoes, bastidores da escrita e notas sobre a
                            evolucao do projeto.
                        </Typography>
                        <Typography component="li" variant="body1">
                            Consulte as secoes de tecnicas e Gambi Design Patterns quando quiser exemplos
                            objetivos de sintomas, causas e formas de reconhecer gambiarra em contexto real.
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h2" component="h2" color="primary">
                        Perguntas frequentes
                    </Typography>
                    {faqItems.map((item) => (
                        <Box key={item.question} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Typography variant="h4" component="h3" color="primary.light">
                                {item.question}
                            </Typography>
                            <Typography variant="body1">{item.answer}</Typography>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    )
}

export { AeoContent, faqItems as homeFaqItems }
