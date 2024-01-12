import express from 'express'
import cors from 'cors'
import { initTRPC } from '@trpc/server'
import {createExpressMiddleware} from '@trpc/server/adapters/express'
import {z} from 'zod'

const t = initTRPC.create();

const users = [
    {id: 1, name: 'admin', email: 'admin@gmail.com', apiKey: 'test1'},
    {id: 2, name: 'user1', email: 'user1@gmail.com', apiKey: 'test2'},
    {id: 3, name: 'user2', email: 'user2@gmail.com', apiKey: 'test3'},
    {id: 4, name: 'user3', email: 'user3@gmail.com', apiKey: 'test4'},
    {id: 5, name: 'test', email: 'test@gmail.com', apiKey: 'test5'},
]

const appRouter = t.router({
    getUsers: t.procedure.query(()=>{
        return users
    }),
    searchUser: t.procedure.input(z.string()).mutation(req => {
        return req.input
    })
})

const app = express()
app.use(cors( {origin: '*'}))
app.use("/trpc", createExpressMiddleware({ router: appRouter}))

app.listen(3000, ()=>{
    console.log('server is listening on port 3000');
})

export type AppRouter = typeof appRouter