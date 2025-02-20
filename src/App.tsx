// src/App.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

import { Preview } from "./components/shared/preview.tsx";
import { Loader } from "./components/shared/loader.tsx";
import { Button } from "./components/ui/button.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "./components/ui/form.tsx";
import { Input } from "./components/ui/input.tsx";

const BACKEND_URL = import.meta.env.NODE_ENV === 'production' 
  ? 'https://link-previewer-4bwb.onrender.com'  
  : 'http://localhost:5000';

export type DataType = {
  title: string;
  description: string;
  image: string;
};

const schema = z.object({
  url: z.string().url("Please enter a valid URL"),
});

function App() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<DataType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      setLoading(true);
      setData(null);
      setError(null);

      console.log('Sending request to:', `${BACKEND_URL}/preview`);
      console.log('Request data:', values);

      const response = await axios.post(`${BACKEND_URL}/preview`, values);
      
      console.log('Response:', response.data);
      
      if (response.data) {
        setData(response.data);
        form.reset();
      }
    } catch (err) {
      console.error("Error:", err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center w-full lg:w-1/2 mx-auto p-10">
      <h1 className="my-10 text-3xl font-bold">Generate Preview for Link</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full gap-2 items-center mb-10"
        >
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input {...field} placeholder="Enter URL (e.g., https://example.com)" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate'}
          </Button>
        </form>
      </Form>

      {error && (
        <div className="text-red-500 mb-4 p-4 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      {isLoading && <Loader />}

      {data && !isLoading && (
        <Preview
          title={data.title}
          description={data.description}
          image={data.image}
        />
      )}

      {data && !data.image && (
        <p className="text-gray-500 mt-2">No preview image available for this URL</p>
      )}
    </div>
  );
}

export default App;