using Sharko.Domain.Common;
using System.Threading.Tasks;

namespace Sharko.Application.Common.Interfaces
{
    public interface IDomainEventService
    {
        Task Publish(DomainEvent domainEvent);
    }
}
