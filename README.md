# Projeto desenvolvido durante a semana OmniStack da RocketSeat
### Para inicializar o projeto
```
yarn run dev
```

### Desenvolvido durante o curso da RocketSeat
#### Para pegar informações da query

#### Significado de JSON = Javascript Object Notation

```
chamando por:
localhost:3000/?name=Matheus

 get.get('/', (req, res) => {
   // Podemos acessar por:
    return res.send(`Hello ${req.params.name}`
})
```

#### timestamps: true
No model de `Devs` tem essa configuração no final do Schema
que basicamente faz com que seja criado dois campos:
`createdAt` e `updatdAt`, onde um é criado quando um novo usuário
é criado na base e o outro é alterado quando o objeto sofrer
algum tipo de alteração.

#### GitHub tem uma api aberta, segue o link
```
https://api.github.com/users/matheusalxds
```
