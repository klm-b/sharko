using AutoMapper;
using Sharko.Application.Common.Mappings;
using Sharko.Application.Summaries.Queries.GetChapter;
using Sharko.Domain.Entities;
using System;
using System.Collections.Generic;
using System.IO;

namespace Sharko.Application.Users.Queries.GetUserActivityByUsername
{
    public class UserActivityDto
    {
        public int Rating { get; set; }
        public int FollowersNum { get; set; }
        public int SummariesNum { get; set; }
        public int CommentsNum { get; set; }
    }
}