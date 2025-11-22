import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getTasksById } from "@/server/tasks/getTasksById";
import { updateTask } from "@/server/tasks/updateTask";

const TaskDetail = async ({ params }: { params: { taskId: string } }) => {
  const { taskId } = await params;
  const tasksData = await getTasksById(taskId);
  const task = tasksData[0];

  function getRemainingDays(dueDateString: string) {
    const today = new Date();
    const dueDate = new Date(dueDateString);

    // Calculate difference in milliseconds
    const diffTime = dueDate.getTime() - today.getTime();

    // Convert milliseconds to days
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  }

  if (!task) {
    return <div className="p-5 text-red-500">Task not found</div>;
  }
  return (
    <div className="flex flex-col items-start justify-start h-screen w-full relative p-5">
      <div className="flex items-center justify-between w-full">
        <div>
          <h1 className="text-2xl">
            {task.title} <span className="font-bold">Details</span>
          </h1>
          <p className="text-sm font-extralight mt-3">{task.description}</p>
        </div>
      </div>
      <div className="w-full mt-10 shadow-md rounded-sm">
        <div className="p-5 w-full">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400">
              Task <span className="font-bold">created</span> on{" "}
              {task.created_at.toLocaleDateString(undefined, {
                month: "long",
                day: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className="text-xs text-gray-400">
              Task <span className="font-bold">updated</span> on{" "}
              {task.updated_at.toLocaleDateString(undefined, {
                month: "long",
                day: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div>
            <h1 className="mt-5">Details</h1>
            <div className="w-full h-px mt-3 mb-5 border-dashed border border-gray-200"></div>
            <form className="w-full" action={updateTask}>
              <Input type="hidden" name="taskId" value={task.id} />
              <div className="flex gap-5 items-center justify-between">
                <div className="grid gap-3 w-full">
                  <Label htmlFor="due_date">
                    Due Date{" "}
                    {getRemainingDays(task.due_date) >= 3 ? (
                      <p className="text-blue-500">
                        <span className="font-bold">
                          {getRemainingDays(task.due_date)}
                        </span>{" "}
                        days remaining
                      </p>
                    ) : getRemainingDays(task.due_date) == 0 ? (
                      <p className="text-red-500">Today is your due date</p>
                    ) : (
                      <p className="text-black font-bold">Overdue</p>
                    )}
                  </Label>
                  <Input
                    type="date"
                    id="due_date"
                    name="due_date"
                    placeholder="Pick due date..."
                    defaultValue={task.due_date}
                  />
                </div>
                <div className="grid gap-3 w-full">
                  <Label htmlFor="priority">
                    Priority{" "}
                    <div
                      className={`w-3 h-3 animate-pulse ${
                        (task.priority === "Low" && "bg-green-500") ||
                        (task.priority === "Medium" && "bg-yellow-400") ||
                        (task.priority === "High" && "bg-red-500")
                      }`}
                    ></div>
                    <div
                      className={`w-3 h-3 animate-bounce ${
                        (task.priority === "Low" && "bg-green-500") ||
                        (task.priority === "Medium" && "bg-yellow-400") ||
                        (task.priority === "High" && "bg-red-500")
                      }`}
                    ></div>
                    <div
                      className={`w-3 h-3 animate-caret-blink ${
                        (task.priority === "Low" && "bg-green-500") ||
                        (task.priority === "Medium" && "bg-yellow-400") ||
                        (task.priority === "High" && "bg-red-500")
                      }`}
                    ></div>
                  </Label>
                  <Select name="priority" defaultValue={task.priority}>
                    <SelectTrigger className={`w-full`}>
                      <SelectValue placeholder="Select Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Priority</SelectLabel>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3 w-full">
                  <Label htmlFor="status">
                    Status{" "}
                    <div
                      className={`w-3 h-3 animate-pulse ${
                        (task.status === "Pending" && "bg-gray-500") ||
                        (task.status === "In Progress" && "bg-blue-500") ||
                        (task.status === "Done" && "bg-green-500")
                      }`}
                    ></div>
                    <div
                      className={`w-3 h-3 animate-bounce ${
                        (task.status === "Pending" && "bg-gray-500") ||
                        (task.status === "In Progress" && "bg-blue-500") ||
                        (task.status === "Done" && "bg-green-500")
                      }`}
                    ></div>
                    <div
                      className={`w-3 h-3 animate-caret-blink ${
                        (task.status === "Pending" && "bg-gray-500") ||
                        (task.status === "In Progress" && "bg-blue-500") ||
                        (task.status === "Done" && "bg-green-500")
                      }`}
                    ></div>
                  </Label>
                  <Select name="status" defaultValue={task.status}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Done">Done</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="w-full flex items-center justify-end mt-5">
                <Button
                  type="submit"
                  className="py-2 px-5 border border-black shadow-md rounded text-sm bg-black hover:bg-white hover:text-black text-white transition-all cursor-pointer"
                >
                  Update
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
