using Microsoft.AspNetCore.Mvc;
using ToDoList.Models;

namespace ToDoList.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly List<TaskItem> _tasks;

        public TasksController(List<TaskItem> tasks)
        {
            _tasks = tasks;
        }

        // GET /tasks
        [HttpGet]
        public ActionResult<IEnumerable<TaskItem>> GetTasks()
        {
            return Ok(_tasks);
        }

        // POST /tasks
        [HttpPost]
        public ActionResult<TaskItem> CreateTask(TaskItem task)
        {
            task.Id = Guid.NewGuid().ToString();
            _tasks.Add(task);
            return CreatedAtAction(nameof(GetTasks), new { id = task.Id }, task);
        }

        // PUT /tasks/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateTask(string id, TaskItem updatedTask)
        {
            var task = _tasks.FirstOrDefault(t => t.Id == id);
            if (task == null) return NotFound();

            task.Title = updatedTask.Title;
            task.Description = updatedTask.Description;
            task.DueDate = updatedTask.DueDate;
            task.Priority = updatedTask.Priority;
            task.Status = updatedTask.Status;

            return NoContent();
        }

        // DELETE /tasks/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteTask(string id)
        {
            var task = _tasks.FirstOrDefault(t => t.Id == id);
            if (task == null) return NotFound();

            _tasks.Remove(task);
            return NoContent();
        }
    }
}
