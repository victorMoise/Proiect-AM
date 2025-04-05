using backend.Repository.Test;
using MediatR;

namespace backend.Queries.Test
{
    public class GetConnection
    {
        public class Query : IRequest<Model> { }

        public record Model
        {
            public string Connection { get; init; }
            public string Error { get; init; }
        }

        internal class QueryHandler : IRequestHandler<Query, Model>
        {
            private readonly ITestRepository _repository;

            public QueryHandler(ITestRepository repository)
            {
                _repository = repository;
            }

            public async Task<Model> Handle(Query request, CancellationToken cancellationToken)
            {
                try
                {
                    await _repository.TestConnection();
                    return new Model { Connection = "connected" };
                }
                catch (Exception e)
                {
                    return new Model { Connection = "not connected", Error = e.Message };
                }
            }
        }
    }
}
