using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using MongoDB.Driver;
using MongoDB.Bson;

using Internships.Models;
using Internships.Models.DTO;
using Internships.Utilities.Storage.Internships;



namespace Internships.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InternshipsController : ControllerBase
    {
        private readonly ILogger<InternshipsController> _logger;
        private readonly IInternshipStorage _InternshipStorage;

        MongoClient dbClient = new MongoClient("mongodb://localhost:27017");

        public InternshipsController(ILogger<InternshipsController> logger,
                                     IInternshipStorage internshipStorage)
        {
            _logger = logger;
            _InternshipStorage = internshipStorage;
        }

        [HttpGet]
        public IEnumerable<Internship> Get()
        {
            var myInternships = new List<Internship>();
            try 
            {
                myInternships = _InternshipStorage.GetInternships().ToList();

            } 
            catch (Exception ex) 
            {
                Console.WriteLine("Exception: " + ex);
            }

            return myInternships.ToArray();
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] InternshipDTO internshipDTO)
        {
            var error = string.Empty;

            try
            {
                Internship internship = new Internship(internshipDTO);

                internship = _InternshipStorage.SubmitNewInternship(internship);

                return Ok(internship);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception POSTing new internship: " + ex);
            }

            return BadRequest(error);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] InternshipDTO internshipDTO)
        {
            var error = "";
            bool retVal = false;

            try
            {
                retVal = _InternshipStorage.DeleteInternship(internshipDTO.Id);

                return Ok(retVal);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error deleting internship: " + ex);
            }

            return BadRequest(error);
        }
    }
}
