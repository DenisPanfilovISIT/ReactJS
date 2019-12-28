﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Data.Models;

namespace WebApplication1.Data.Interfaces
{
   public  interface IClient
    {
        IEnumerable<Client> Clients { get; }
        Client GetClient(int id);
    }
}
