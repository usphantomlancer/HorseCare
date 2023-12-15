import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '~/components/ui/Button'
import { Input } from '~/components/ui/Input'
import { TextArea } from '~/components/ui/TextArea'
import { useUserStore } from '~/hooks/use-user'
import { supabase } from '~/lib/supabase'

const formSchema = z.object({
  title: z.string().min(1, 'Required'),
  description: z.string().min(1, 'Required'),
  price: z.string().min(1, 'Required'),
})
type FormSchema = z.infer<typeof formSchema>

export default function Create() {
  const navigate = useNavigate()
  const { user } = useUserStore()
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })
  const [loading, setLoading] = useState(false)

  async function onSubmit(values: FormSchema) {
    setLoading(true)

    const { error, data } = await supabase
      .from('services')
      .insert({
        title: values.title,
        description: values.description,
        price: parseInt(values.price),
        user_id: user?.id,
      })
      .select()

    setLoading(false)

    if (error) {
      return toast.error('Something went wrong. Please try again.')
    }

    reset()
    toast.success('Service created.')
    return navigate(`/service/${data[0].id}`)
  }

  return (
    <div className="container py-12">
      <h1 className="text-2xl font-semibold">Create your service</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 grid w-full max-w-lg gap-4"
      >
        <Input
          label="Service Title"
          error={errors.title?.message}
          {...register('title')}
        />
        <TextArea
          label="Description"
          error={errors.description?.message}
          rows={6}
          {...register('description')}
        />
        <Input
          type="number"
          label="Price ($)"
          error={errors.price?.message}
          {...register('price')}
        />
        <div>
          <Button loading={loading}>Create Service</Button>
        </div>
      </form>
    </div>
  )
}
