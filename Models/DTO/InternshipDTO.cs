using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

using Newtonsoft.Json;


namespace Internships.Models.DTO
{
    public class InternshipDTO
    {
        [JsonProperty("id")]
        public string Id { get; set; }
        
        [JsonProperty("title")]
        public string   Title           { get; set; }

        [JsonProperty("company")]
        public string   Company         { get; set; }

        [JsonProperty("location")]
        public string   Location        { get; set; }

        [JsonProperty("description")]
        public string   Description     { get; set; }

        [JsonProperty("pay")]
        public double   Pay             { get; set; }

        [JsonProperty("payPerHour")]
        public bool     PayPerHour      { get; set; }
    }
}