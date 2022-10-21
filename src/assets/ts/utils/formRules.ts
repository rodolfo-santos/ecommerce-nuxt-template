export const formRules = {
  required: [(v: any) => !!v || 'Este campo é obrigatório.'],
  email: [
    (v: string) => !!v || 'Este campo é obrigatório.',
    (v: string) => /.+@.+\..+/.test(v) || 'Insira um E-mail Válido.'
  ],
  password: [
    (v: string) => !!v || 'Este campo obrigatório.',
    (v: string) => (v && v.length >= 8) || 'A senha precisa ter no mínimo 8 caracteres',
    (v: string) => /(?=.*[a-z])|(?=.*[A-Z])/.test(v) || 'Adicione letras a sua senha.',
    (v: string) => /(?=.*\d)/.test(v) || 'Adicione números a sua senha.'
  ],
  phone: [(v: string) => !!v || 'Este campo obrigatório.', (v: string) => /^[0-9]/.test(v) || 'Digite apenas números'],
  cpf: [
    (v: string) => !!v || 'Este campo obrigatório.',
    (v: string) => v.length >= 10 || 'CPF deve possuir no mínimo 10 caracteres.'
  ]
};
