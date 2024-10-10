// DTO received from client to update a user.
public class UserUpdateDto
{
    public int UserID { get; set; }
    public string? UserType { get; set; }
    public string? OldPassword { get; set; }
    public string? NewPassword { get; set; }
    public string? UserEmail { get; set; }
}
