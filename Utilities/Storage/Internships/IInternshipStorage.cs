
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

using Internships.Models.DTO;
using Internships.Models;



namespace Internships.Utilities.Storage.Internships
{
    public interface IInternshipStorage
    {
        List<Internship>        GetInternships();
        Internship              SubmitNewInternship(Internship internship);
        bool                    DeleteInternship(string id);
    }
}