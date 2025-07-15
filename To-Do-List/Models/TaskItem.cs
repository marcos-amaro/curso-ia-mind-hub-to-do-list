using System.ComponentModel.DataAnnotations;

/// <summary>
/// Tarea de ejemplo:
/// {
///   "title": "Comprar pan",
///   "description": "Ir a la panadería",
///   "dueDate": "2024-07-15",
///   "priority": "Medium",
///   "status": "Pending"
/// }
/// </summary>
namespace ToDoList.Models
{
    public class TaskItem
    {
        public string? Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        public DateOnly? DueDate { get; set; }

        [Required]
        [RegularExpression("Low|Medium|High")]
        public string Priority { get; set; } = "Low";

        [Required]
        [RegularExpression("Pending|Completed")]
        public string Status { get; set; } = "Pending";
    }
}
