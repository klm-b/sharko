using Sharko.Application.Common.Interfaces;
using System;

namespace Sharko.Infrastructure.Services
{
    public class DateTimeService : IDateTime
    {
        public DateTime Now => DateTime.Now;
    }
}
