
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

using Serilog;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;

using Internships.Models;
using Internships.Models.DTO;
using Internships.Configuration;



namespace Internships.Utilities.Storage.Internships.Implementations
{
    public class MongoDBInternshipStorage : IInternshipStorage
    {
        #region Instance Variables

        private readonly string DOCUMENT_DB_HOST = AppConfiguration.DBHost();
        private readonly int DOCUMENT_DB_PORT = AppConfiguration.DBPort();
        private readonly string DATABASE_NAME = AppConfiguration.DBName();
        private readonly string DATABASE_USERNAME = AppConfiguration.DBUserName();
        private readonly string DATABASE_PASSWORD = AppConfiguration.DBPassword();

        private readonly string INTERNSHIPS_COLLECTION = "internships";

        private MongoClientSettings _MongoClientSettings;
        private readonly IMongoDatabase _InternshipsDatabase;

        #endregion

        #region Constructor

        public MongoDBInternshipStorage()
        {
            Log.Debug($"Aquiring connection to {DOCUMENT_DB_HOST}, Database: {DATABASE_NAME}");
            _MongoClientSettings = new MongoClientSettings
            {
                Server = new MongoServerAddress(DOCUMENT_DB_HOST, DOCUMENT_DB_PORT),
                Credential = MongoCredential.CreateCredential(
                    databaseName: DATABASE_NAME,
                    username: DATABASE_USERNAME,
                    password: DATABASE_PASSWORD
                )
            };

            _InternshipsDatabase = new MongoClient(_MongoClientSettings).GetDatabase(DATABASE_NAME);

            Log.Debug($"Database configured and created");
        }

        public List<Internship> GetInternships()
        {
            List<Internship> retVal = new List<Internship>();

            try
            {
                var builder = Builders<BsonDocument>.Filter;

                var filter = Builders<Internship>.Filter.Empty;;

                var result = _InternshipsDatabase.GetCollection<BsonDocument>(INTERNSHIPS_COLLECTION)
                                                .Find(_ => true)
                                                .ToList();

                retVal = result.Select(internship => BsonSerializer.Deserialize<Internship>(internship)).ToList();
            }
            catch (Exception ex)
            {
                Log.Error(ex, $"Error finding internships");
                throw;
            }

            return retVal;
        }

        public Internship SubmitNewInternship(Internship internship)
        {
            Internship retVal = null;

            try
            {
                var bsonDoc = internship.ToBsonDocument();

                _InternshipsDatabase.GetCollection<BsonDocument>(INTERNSHIPS_COLLECTION)
                                    .InsertOne(bsonDoc);

                retVal = BsonSerializer.Deserialize<Internship>(bsonDoc);
            }
            catch (Exception ex)
            {
                Log.Error(ex, $"Error inserting new internship");
                throw;
            }

            return retVal;
        }

        public bool DeleteInternship(string id)
        {
            bool retVal = false;
            
            try
            {
                retVal = _InternshipsDatabase.GetCollection<BsonDocument>(INTERNSHIPS_COLLECTION)
                                             .DeleteOne(internship => internship["Id"] == id)
                                             .IsAcknowledged;
            }
            catch(Exception ex)
            {
                Log.Error(ex, $"Error deleting internship: {id}");
                throw;
            }

            return retVal;
        }

        #endregion
    }
}