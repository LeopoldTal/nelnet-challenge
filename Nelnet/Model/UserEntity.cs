using System.ComponentModel.DataAnnotations;

// User row stored in table.
public class UserEntity
{
    [Key]
    public int UserID { get; set; }
    public required string UserType { get; set; }
    public required string UserEmail { get; set; }
    public string? PasswordHash { get; set; }
    public DateTime DateJoined { get; set; }
    public DateTime DateLastUpdated { get; set; }
}
