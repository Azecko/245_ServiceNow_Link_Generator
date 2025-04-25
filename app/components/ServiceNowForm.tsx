import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  caller_id: number
  short_description: string
  description: string
}

export default function ServiceNowForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Inputs>()
      const onSubmit: SubmitHandler<Inputs> = (data) => {
        let baseUrl = `https://epfl.service-now.com/incident.do?sys_id=-1&sysparm_stack=incident_list.do&sysparm_query=^category=incident^assigned_to=javascript:gs.getUserID()`
        for (const [key, value] of Object.entries(data)) {
          if (key === "caller_id") {
            baseUrl += `^caller_id=javascript:var userRecord = new GlideRecord('sys_user'); userRecord.addQuery('user_name', '${value}'); userRecord.query(); if(userRecord.next()) { userRecord.sys_id }`
          } else {
            baseUrl += `^${key}=${value}`
          }
        }
        navigator.clipboard.writeText(baseUrl).then(() => {
          alert("Le lien a été copié dans le presse-papier !")
        }, (err) => {
          console.error('Could not copy text: ', err);
        });
      }

      return (
        <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                    <label htmlFor="short-desc">Appelant (sciper)</label>
                    <input id="short-desc" className="border-1 w-xl" {...register("caller_id")} />
                </div>

                <div className="flex gap-2 items-center">
                    <label htmlFor="short-desc">Description courte</label>
                    <input id="short-desc" className="border-1 w-xl" {...register("short_description")} />
                </div>

                <div className="flex gap-2 items-center">
                    <label htmlFor="desc">Description initiale</label>
                    <textarea rows={5} id="desc" className="border-1 w-xl resize-none" {...register("description")} />
                </div>
            </div>

            <input className="mt-8 bg-red-500 p-3 rounded-lg text-white hover:cursor-pointer hover:bg-red-600 transition ease-in-out" type="submit" value="Générer le lien" />
        </form>
      )
}