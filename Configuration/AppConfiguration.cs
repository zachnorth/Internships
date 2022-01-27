using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Internships.Configuration
{
    public static class AppConfiguration
    {
        #region Default values

        private const string DEFAULT_DB_HOST = "localhost";
        private const int DEFAULT_DB_PORT = 27017;
        private const string DEFAULT_DB_NAME = "data";
        private const string DEFAULT_DB_USERNAME = "admin";
        private const string DEFAULT_DB_PASSWORD = "password";

        #endregion

        #region Environment Variables

        private const string ENV_DB_HOST = "DB_HOST";
        private const string ENV_DB_PORT = "DB_PORT";
        private const string ENV_DB_NAME = "DB_NAME";
        private const string ENV_DB_USERNAME = "DB_USERNAME";
        private const string ENV_DB_PASSWORD = "DB_PASSWORD";

        #endregion

        #region Public Configuration Methods

        public static string DBHost()
        {
            return ParseEnvVar(ENV_DB_HOST, DEFAULT_DB_HOST);
        }

        public static int DBPort()
        {
            return ParseInt(ENV_DB_PORT, DEFAULT_DB_PORT);
        }

        public static string DBName()
        {
            return ParseEnvVar(ENV_DB_NAME, DEFAULT_DB_NAME);
        }

        public static string DBUserName()
        {
            return ParseEnvVar(ENV_DB_USERNAME, DEFAULT_DB_USERNAME);
        }

        public static string DBPassword()
        {
            return ParseEnvVar(ENV_DB_PASSWORD, DEFAULT_DB_PASSWORD);
        }

        #endregion

        #region Private Configuration Methods

        private static bool ParseBool(string boolEnv)
        {
            return bool.Parse(ParseEnvVar(boolEnv));
        }

        private static int ParseInt(string doubleEnv, int defaultValue)
        {
            var retVal = defaultValue;
            var envVal = ParseEnvVar(doubleEnv);

            if(string.IsNullOrEmpty(envVal))
            {
                return defaultValue;
            }

            if(!int.TryParse(envVal, out retVal))
            {
                retVal = defaultValue;
            }

            return retVal;
        }

        private static double ParseDouble(string doubleEnv, double defaultValue)
        {
            var retVal = defaultValue;
            var envVal = ParseEnvVar(doubleEnv);

            if(string.IsNullOrEmpty(envVal))
            {
                return defaultValue;
            }

            if(!double.TryParse(envVal, out retVal))
            {
                retVal = defaultValue;
            }

            return retVal;
        }

        private static string ParseEnvVar(string varEnv, string defaultValue = null)
        {
            var retVal = Environment.GetEnvironmentVariable(varEnv);

            if(string.IsNullOrEmpty(retVal))
            {
                retVal = defaultValue;
            }

            return retVal;
        }

        #endregion

    }
}