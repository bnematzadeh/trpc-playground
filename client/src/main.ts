import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"
import type { AppRouter } from "../../server/"

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc",
    }),
  ],
})

async function main() {
  document.getElementById('btn').addEventListener('click',async ()=>{
    const data = document.getElementById('search').value
    const result = await client.searchUser.mutate(data)
    document.getElementById('result').innerHTML = "Result: " + result
  })
}

main()
