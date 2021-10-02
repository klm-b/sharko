using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sharko.Application.Categories.Queries.GetCategoriesWithTags
{
    public class CategoriesWithTagsVm
    {
        public IList<CategoryWithTagsDto> Categories { get; set; }
    }
}
