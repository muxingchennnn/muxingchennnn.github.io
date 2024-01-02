<script>
  import '../app.pcss'
  import '../font.css'
  import { dev } from '$app/environment'
  import { inject } from '@vercel/analytics'

  // vercel web analytics
  inject({ mode: dev ? 'development' : 'production' })
</script>

<slot />
