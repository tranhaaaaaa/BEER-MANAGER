using System.Reflection;
using System.Security.Cryptography;
using System.Text;

namespace BEERAPI.Services.Helper
{
    public class Unity
    {
    public static int GetIdOfObject<T>(T obj) where T : class
        {
            var properties = obj.GetType().GetProperties();
            foreach (PropertyInfo property in properties)
            {
                if (property.Name == "Id")
                    return (int)property.GetValue(obj, null);
            }
            return -1;
        }

      
        public static string Md5Hash(string input)
        {
            using (var md5 = MD5.Create())
            {
                var result = md5.ComputeHash(Encoding.ASCII.GetBytes(input));
                var strResult = BitConverter.ToString(result);
                return strResult.Replace("-", "");
            }
        }
    }
}
