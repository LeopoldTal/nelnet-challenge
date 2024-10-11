using Microsoft.EntityFrameworkCore;

// Users database context.
public partial class UserMasterContext : DbContext
{
    public UserMasterContext(DbContextOptions options) : base(options) { }

    public virtual DbSet<UserEntity> UserMaster { get; set; }

    public static UserDto ToDto(UserEntity user)
    {
        return new UserDto
        {
            UserID = user.UserID,
            UserType = user.UserType,
            UserEmail = user.UserEmail,
            HasPassword = user.PasswordHash != null,
            DateJoined = user.DateJoined,
            DateLastUpdated = user.DateLastUpdated,
        };
    }

    // Gets all users.
    public List<UserDto> GetUsers()
    {
        var allUsers = UserMaster.Select(ToDto);
        return [.. allUsers];
    }

    // Gets one user by UserID, or null if none exists.
    public UserDto? GetUserByID(int userID)
    {
        var user = UserMaster.Find(userID);
        return user == null ? null : ToDto(user);
    }

    // Modifies a user if it exists, and returns the modified user.
    public UserDto? UpdateUser(UserUpdateDto dto)
    {
        SaveChanges();
        var user = UserMaster.Find(dto.UserID);
        return ToDto(user);
    }
}

public class ContextFactory
{
    // Builds a database context for UserMaster.
    public static UserMasterContext CreateContext()
    {
        // Connection string for the database.
        var configurationBuilder = new ConfigurationBuilder()
                        .SetBasePath(Directory.GetCurrentDirectory())
                        .AddJsonFile("appsettings.json");

        var configuration = configurationBuilder.Build();

        var connectionString = configuration["ConnectionStrings:UserMasterContext"];
        var optionsBuilder = new DbContextOptionsBuilder<UserMasterContext>();
        optionsBuilder.UseSqlServer(connectionString);
        return new UserMasterContext(optionsBuilder.Options);
    }
}
