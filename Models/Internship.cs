using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Internships.Models.DTO;

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MessagePack;
using Newtonsoft.Json;


namespace Internships.Models
{
    [Serializable]
    [MessagePackObject]
    public class Internship
    {
        public Internship(
            string title,
            string company,
            string location,
            string description,
            double pay,
            bool payPerHour)
        {
            Title = title;
            Company = company;
            Location = location;
            Description = description;
            Pay = pay;
            PayPerHour = payPerHour;
        }

        public Internship(InternshipDTO internshipDTO)
        {
            // Id = ObjectId.Parse(internshipDTO.Id);
            _id = ObjectId.GenerateNewId();
            Id = _id.ToString();
            Title = internshipDTO.Title;
            Company = internshipDTO.Company;
            Location = internshipDTO.Location;
            Description = internshipDTO.Description;
            Pay = internshipDTO.Pay;
            PayPerHour = internshipDTO.PayPerHour;
        }

        public Internship()
        {
            
        }

        
        [Key(nameof(_id))]
        [BsonId()]
        public ObjectId _id { get; set; }

        [Key(nameof(Id))]
        public string Id { get; set; }

        [Key(nameof(Title))]
        public string   Title           { get; set; }
        
        [Key(nameof(Company))]
        public string   Company         { get; set; }
        
        [Key(nameof(Location))]
        public string   Location        { get; set; }
        
        [Key(nameof(Description))]
        public string   Description     { get; set; }
        
        [Key(nameof(Pay))]
        public double   Pay             { get; set; }
        
        [Key(nameof(PayPerHour))]
        public bool     PayPerHour      { get; set; }
    }
}
