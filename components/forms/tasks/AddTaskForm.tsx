import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
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
import { Textarea } from "@/components/ui/textarea";
import { addTask } from "@/server/tasks/addTasks";

const AddTaskForm = async ({ project }: { project: any }) => {
  return (
    <form className="mt-3" action={addTask}>
      <div className="grid gap-4">
        <div className="grid gap-3">
          <Input type="hidden" name="projectId" value={project.id} />
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            name="title"
            placeholder="e.g. CL Visual"
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="e.g. Work project..."
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="due_date">Due Date</Label>
          <Input
            type="date"
            id="due_date"
            name="due_date"
            placeholder="Pick due date..."
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="priority">Priority</Label>
          <Select name="priority">
            <SelectTrigger className="w-full">
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
        <div className="grid gap-3">
          <Label htmlFor="status">Status</Label>
          <Select name="status">
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
      <DialogFooter className="mt-5">
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type="submit">Add Task</Button>
        </DialogClose>
      </DialogFooter>
    </form>
  );
};

export default AddTaskForm;
