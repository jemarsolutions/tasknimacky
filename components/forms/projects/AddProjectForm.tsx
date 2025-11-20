import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { auth } from "@/lib/auth";
import { addProject } from "@/server/projects/addProject";
import { headers } from "next/headers";

const AddProjectForm = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <form className="mt-3" action={addProject}>
      <div className="grid gap-4">
        <div className="grid gap-3">
          <Input type="hidden" name="userId" value={session?.user.id} />
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
      </div>
      <DialogFooter className="mt-5">
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type="submit">Add Project</Button>
        </DialogClose>
      </DialogFooter>
    </form>
  );
};

export default AddProjectForm;
