// User DTO sent to client.
public class UserDto
{
    public int UserID { get; set; }
    public required string UserType { get; set; }
    public string? UserEmail { get; set; }
    public bool HasPassword { get; set; }
    public DateTime DateJoined { get; set; }
    public DateTime DateLastUpdated { get; set; }
}
