namespace backend.Middleware
{
    public class QueryStringTokenMiddleware
    {
        private readonly RequestDelegate _next;

        public QueryStringTokenMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var token = context.Request.Query["token"].FirstOrDefault();

            if (!string.IsNullOrEmpty(token))
            {
                context.Request.Headers["Authorization"] = $"Bearer {token}";
            }

            await _next(context);
        }
    }
}
