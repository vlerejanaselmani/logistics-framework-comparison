import 'dotenv/config'

import { createApp } from './app.js'

const port = Number(process.env.PORT ?? 3000)
const app = createApp()

app.listen(port, () => {
  console.log(`Express logistics API running on http://localhost:${port}`)
})
