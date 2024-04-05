let participantes = [
  {
      nome: "Diego Fernandes",
      email: "diego@gmail.com",
      dataInscricao: new Date(2024, 2, 23, 19, 23),
      dataCheckIn: new Date(2024, 2, 25, 20, 20)
  },
  {
      nome: "Mayk Brito",
      email: "mayk@gmail.com",
      dataInscricao: new Date(2024, 1, 2, 19, 23),
      dataCheckIn: null
  },
  {
      nome: "Lucas Oliveira",
      email: "lucas@gmail.com",
      dataInscricao: new Date(2024, 2, 3, 19, 23),
      dataCheckIn: new Date(2024, 2, 3, 20, 20)
  },
  {
      nome: "Amanda Souza",
      email: "amanda@gmail.com",
      dataInscricao: new Date(2024, 1, 4, 19, 23),
      dataCheckIn: new Date(2024, 1, 7, 20, 20)
  },
  {
      nome: "José Silva",
      email: "jose@gmail.com",
      dataInscricao: new Date(2024, 0, 5, 19, 23),
      dataCheckIn: new Date(2024, 0, 8, 20, 20)
  },
  {
      nome: "Ana Lima",
      email: "ana@gmail.com",
      dataInscricao: new Date(2024, 3, 6, 19, 23),
      dataCheckIn: new Date(2024, 3, 6, 20, 20)
  },
  {
      nome: "Pedro Santos",
      email: "pedro@gmail.com",
      dataInscricao: new Date(2024, 4, 7, 19, 23),
      dataCheckIn: new Date(2024, 4, 7, 20, 20)
  },
  {
      nome: "Maria Pereira",
      email: "maria@gmail.com",
      dataInscricao: new Date(2024, 5, 8, 19, 23),
      dataCheckIn: null
  },
  {
      nome: "Gabriel Costa",
      email: "gabriel@gmail.com",
      dataInscricao: new Date(2024, 6, 9, 19, 23),
      dataCheckIn: null
  },
  {
      nome: "Fernanda Santos",
      email: "fernanda@gmail.com",
      dataInscricao: new Date(2024, 7, 10, 19, 23),
      dataCheckIn: null
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)
  
  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)

  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }
  return `
  <tr>
      <td>
        <strong>
          ${participante.nome}
        </strong>
        <br>
        <small>
          ${participante.email}
        </small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""

  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome:dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  event.target.querySelector('[name="nome"]').value= ""
  event.target.querySelector('[name="email"]').value= ""
}

const fazerCheckIn = (event) => {
  const menssagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'
  if(confirm(menssagemConfirmacao) == false) {
    return
  }

  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
  )

  participante.dataCheckIn = new Date()

  atualizarLista(participantes)
}