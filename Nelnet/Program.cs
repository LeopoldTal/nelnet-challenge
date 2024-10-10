using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Serving locally only so, no HTTPS.

// Lists all users.
app.MapGet("/GetUsers", () =>
{
    using (var db = ContextFactory.CreateContext())
    {
        var allUsers = db.GetUsers();
        Console.WriteLine("Reading {0} users", allUsers.Count);
        return Results.Ok(allUsers);
    }
})
.WithName("GetUsers")
.WithOpenApi();

app.MapGet("/GetUserByID", ([FromQuery] int userID) =>
{
    using (var db = ContextFactory.CreateContext())
    {
        var user = db.GetUserByID(userID);
        if (user == null)
        {
            Console.WriteLine("No such userID: {0}", userID);
            return Results.NotFound();
        }
        Console.WriteLine("Reading user: {0} | {1} | {2}", user.UserID, user.UserType, user.UserEmail);
        return Results.Ok(user);
    }
})
.WithName("GetUserByID")
.WithOpenApi();

// Updates email, type, or password for an existing user.
app.MapPatch("/UpdateUser", ([FromBody] UserUpdateDto dto) =>
{
    using (var db = ContextFactory.CreateContext())
    {
        var user = db.UserMaster.Find(dto.UserID);
        if (user == null)
        {
            Console.WriteLine("No such userID: {0}", dto.UserID);
            return Results.NotFound();
        }
        Console.WriteLine("Updating user: {0} | {1} | {2}", user.UserID, user.UserType, user.UserEmail);

        // Validate password, if set.
        var hasher = new PasswordHasher<UserEntity>();
        if (string.IsNullOrEmpty(user.PasswordHash))
        {
            Console.WriteLine("Update allowed because the user hasn't yet set their password.");
        }
        else
        {
            if (string.IsNullOrEmpty(dto.OldPassword))
            {
                Console.WriteLine("Update rejected because the password is missing.");
                return Results.BadRequest("Password required");
            }
            var passwordMatch = hasher.VerifyHashedPassword(user, user.PasswordHash, dto.OldPassword);
            if (passwordMatch == PasswordVerificationResult.Failed)
            {
                Console.WriteLine("Update rejected because the password is incorrect.");
                return Results.BadRequest("Wrong password");
            }
            Console.WriteLine("Update allowed because the correct password was provided.");
        }

        if (!string.IsNullOrEmpty(dto.UserType))
        {
            user.UserType = dto.UserType;
        }
        if (!string.IsNullOrEmpty(dto.UserEmail))
        {
            user.UserEmail = dto.UserEmail;
        }
        if (!string.IsNullOrEmpty(dto.NewPassword))
        {
            user.PasswordHash = hasher.HashPassword(user, dto.NewPassword);
        }
        user.DateLastUpdated = DateTime.Now;

        db.SaveChanges();

        var updatedUser = db.GetUserByID(dto.UserID);
        return Results.Ok(updatedUser);
    }
})
.WithName("UpdateUser")
.WithOpenApi();

app.Run();
