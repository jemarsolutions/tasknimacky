import { loadSearchParams } from "@/app/SearchParams";
import AddTaskForm from "@/components/forms/tasks/AddTaskForm";
import ProductsFilter from "@/components/ProductsFilter";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getProjectsById } from "@/server/projects/getProjectsById";
import { getAllTasksForSearch } from "@/server/tasks/getTasks";
import { revalidateTag } from "next/cache";
import Link from "next/link";
import { SearchParams } from "nuqs/server";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

const TasksPage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: SearchParams;
}) => {
  const { id } = await params;
  const projectData = await getProjectsById(id);
  const project = projectData[0];
  const projectId = project.id;

  const { search } = await loadSearchParams(searchParams);
  const tasks = await getAllTasksForSearch(search, projectId);

  async function refetchProducts() {
    "use server";
    revalidateTag("products", "");
  }

  return (
    <div className="flex flex-col items-start justify-start h-screen w-full relative p-5">
      <div className="flex items-center justify-between w-full">
        <div>
          <h1 className="text-2xl">
            {project.title}'s <span className="font-bold">Tasks</span>
          </h1>
          <p className="text-sm font-extralight mt-3">{project.description}</p>
        </div>
        <div>
          <Dialog>
            <DialogTrigger className="w-full focus:bg-accent hover:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:text-destructive! [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
              <div className="py-2 px-5 border border-black shadow-md rounded text-sm bg-black hover:bg-white hover:text-black text-white transition-all cursor-pointer">
                Add Task
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Task</DialogTitle>
                <DialogDescription>
                  Add your task here for project "{project.title}"
                </DialogDescription>
              </DialogHeader>
              <AddTaskForm project={project} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="w-full">
        <ProductsFilter refetchProducts={refetchProducts} />
      </div>
      <div className="w-full mt-10">
        <h1 className="font-bold text-sm mb-2 flex gap-2 items-center">
          Ongoing{" "}
          {tasks.filter((task) => task.status != "Done").length > 0 && (
            <>
              <div
                className={`ml-5 w-2 h-2 animate-pulse bg-gray-500
                `}
              ></div>
              <div
                className={`w-2 h-2 animate-bounce bg-gray-500
              `}
              ></div>
              <div
                className={`w-2 h-2 animate-caret-blink bg-gray-500
                `}
              ></div>
            </>
          )}
        </h1>
        {tasks.filter((task) => task.status != "Done").length > 0 ? (
          <div className="relative overflow-x-auto bg-neutral-primary-soft rounded-base border border-default w-full rounded-sm shadow-md">
            <table className="w-full text-sm text-left rtl:text-right text-body shadow-md">
              <thead className="text-sm text-white bg-black border-b rounded">
                <tr>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Due Date
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Priority
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {tasks
                  .filter((task) => task.status != "Done")
                  .map((task) => (
                    <tr
                      className="bg-neutral-primary border-b border-default"
                      key={task.id}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                      >
                        {task.title}
                      </th>
                      <td className="px-6 py-4">{task.description}</td>
                      <td className="px-6 py-4">{task.due_date}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 items-center">
                          <div className="flex gap-2">
                            <div
                              className={`w-3 h-3 animate-pulse ${
                                (task.priority === "Low" && "bg-green-500") ||
                                (task.priority === "Medium" &&
                                  "bg-yellow-400") ||
                                (task.priority === "High" && "bg-red-500")
                              }`}
                            ></div>
                          </div>
                          <div>{task.priority} </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 items-center">
                          <div className="flex gap-2">
                            <div
                              className={`w-3 h-3 animate-pulse ${
                                (task.status === "Pending" && "bg-gray-500") ||
                                (task.status === "In Progress" &&
                                  "bg-blue-500") ||
                                (task.status === "Done" && "bg-green-500")
                              }`}
                            ></div>
                          </div>
                          <div>{task.status} </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right flex gap-2 items-center justify-end">
                        <Link
                          href={`/projects/${project.id}/tasks/${task.id}`}
                          className="py-1 px-2 border border-black shadow-md rounded text-sm bg-white hover:bg-black hover:text-white text-black transition-all cursor-pointer"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
              <tfoot className="text-sm text-white bg-gray-400 border-b rounded w-full">
                <tr>
                  <th
                    scope="col"
                    colSpan={100}
                    className="px-6 py-3 font-medium text-center"
                  >
                    All ongoing tasks for {project.title}'s project.
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <p>No ongoing tasks for now...</p>
        )}
        <h1 className="font-bold text-sm mb-2 mt-10 flex gap-2 items-center">
          Done Tasks{" "}
          {tasks.filter((task) => task.status === "Done").length > 0 && (
            <>
              <div
                className={`ml-5 w-2 h-2 animate-pulse bg-green-500
                `}
              ></div>
              <div
                className={`w-2 h-2 animate-bounce bg-green-500
              `}
              ></div>
              <div
                className={`w-2 h-2 animate-caret-blink bg-green-500
                `}
              ></div>
            </>
          )}
        </h1>

        {tasks.filter((task) => task.status === "Done").length > 0 ? (
          <div className="relative overflow-x-auto bg-neutral-primary-soft rounded-base border border-default w-full rounded-sm shadow-md">
            <table className="w-full text-sm text-left rtl:text-right text-body shadow-md">
              <thead className="text-sm text-white bg-black border-b rounded">
                <tr>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Due Date
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Priority
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {tasks
                  .filter((task) => task.status === "Done")
                  .map((task) => (
                    <tr
                      className="bg-neutral-primary border-b border-default"
                      key={task.id}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                      >
                        {task.title}
                      </th>
                      <td className="px-6 py-4">{task.description}</td>
                      <td className="px-6 py-4">{task.due_date}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 items-center">
                          <div className="flex gap-2">
                            <div
                              className={`w-3 h-3 animate-pulse ${
                                (task.priority === "Low" && "bg-green-500") ||
                                (task.priority === "Medium" &&
                                  "bg-yellow-400") ||
                                (task.priority === "High" && "bg-red-500")
                              }`}
                            ></div>
                          </div>
                          <div>{task.priority} </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 items-center">
                          <div className="flex gap-2">
                            <div
                              className={`w-3 h-3 animate-pulse ${
                                (task.status === "Pending" && "bg-gray-500") ||
                                (task.status === "In Progress" &&
                                  "bg-blue-500") ||
                                (task.status === "Done" && "bg-green-500")
                              }`}
                            ></div>
                          </div>
                          <div>{task.status} </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right flex gap-2 items-center justify-end">
                        <Link
                          href={`/projects/${project.id}/tasks/${task.id}`}
                          className="py-1 px-2 border border-black shadow-md rounded text-sm bg-white hover:bg-black hover:text-white text-black transition-all cursor-pointer"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
              <tfoot className="text-sm text-white bg-green-400 border-b rounded w-full">
                <tr>
                  <th
                    scope="col"
                    colSpan={100}
                    className="px-6 py-3 font-medium text-center"
                  >
                    All done tasks for {project.title}'s project.
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <p>No done tasks for now...</p>
        )}
      </div>
    </div>
  );
};

export default TasksPage;
