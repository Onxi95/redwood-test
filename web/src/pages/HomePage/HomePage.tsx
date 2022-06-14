import { Form, Submit, TextField } from '@redwoodjs/forms'
import { MetaTags } from '@redwoodjs/web'
import { useEffect, useState } from 'react'

async function mockFetch(): Promise<
  { name: string; surname: string; status: 'success' } | { status: 'error' }
> {
  return new Promise((resolve, reject) => {
    const number = Math.random()
    if (number > 0.3) {
      return resolve({
        name: 'Paweł',
        surname: 'Sowa',
        status: 'success',
      })
    }
    return reject({
      status: 'error',
    })
  })
}

const HomePage = () => {
  const [formValues, setFormValues] = useState({
    name: 'this is my name',
    surname: 'this is my surname',
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await mockFetch()
        if (data.status === 'success') {
          setFormValues({
            name: data.name,
            surname: data.surname,
          })
        }
      } catch (e) {
        alert(JSON.stringify(e))
      }
    }
    fetchData()
  }, [])
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <main>Home</main>
      <Form
        onSubmit={(values) => alert(JSON.stringify(values, null, 4))}
        config={{
          defaultValues: formValues,
        }}
      >
        <TextField name="name" />
        <TextField name="surname" />
        <Submit>Save</Submit>
      </Form>
    </>
  )
}

export default HomePage
