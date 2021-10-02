using AutoMapper;
using Sharko.Application.Common.Mappings;
using Sharko.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sharko.Application.Categories.Queries.GetCategories
{
    public class CategoryDto : IMapFrom<Category>
    {
        public string Name { get; set; }
        public string Icon { get; set; }
        public string Key { get; set; }
    }
}
