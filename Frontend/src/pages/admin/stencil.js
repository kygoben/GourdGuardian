import React, { useEffect } from "react";
import Navbar from "@/components/AdminNav";
import { useState } from 'react';
import styles from "@/styles/stencil.module.css";
import AdminSignInPrompt from "@/components/AdminSignInPrompt";
import { supabase } from "../../../supabaseConnection.js";

const Stencils = () => {
  const [stage, setStage] = useState(1);
  const [finished, setFinished] = useState(0);
  const [total, setTotal] = useState(0);
  const [sid, setSid] = useState('');
  const [cid, setCid] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [stencil, setStencil] = useState({
    title: '',
    cid: '',
    extras: '',
    website: '',
    path: 'abcdef.stencil',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase.from('category').select('cid, cname');

      if (error) {
        throw error;
      }

      if (data) {
        setCategories(data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error.message);
    }
  };

  const handleCategoryChange = (event) => {
    setStencil((prevStencil) => ({
      ...prevStencil,
      cid: event.target.value,
    }));
  };

  const handleSidChange = (event) => {
    setSid(event.target.value);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handlePDFUpload = async () => {
    if (!sid || !file) {
      alert('Please enter a SID and choose a file.');
      return;
    }

    // Check if the file has a PDF extension
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      alert(`File ${file.name} is not a valid PDF.`);
      return;
    }

    // Check if the file already exists in the bucket
    const { data: existingFile, error: existingFileError } = await supabase.storage
      .from('stencils')
      .list(`${sid}.pdf`);

    if (existingFileError) {
      console.error(`Error checking existing file in bucket ${bucketName}:`, existingFileError.message);
      return null;
    }

    // If the file exists, remove it before uploading the new one
    if (existingFile) {
      const { error: removeError } = await supabase.storage
        .from('stencils')
        .remove(`${sid}.pdf`);

      if (removeError) {
        console.error(`Error removing existing file in bucket ${bucketName}:`, removeError.message);
        return null;
      }
    }

    // Upload the file to the Supabase storage bucket
    try {
      const fileName = `${sid}.pdf`;

      const { data, error } = await supabase.storage
        .from('stencils')
        .upload(fileName, file);

      if (error) {
        console.error('Error uploading file:', error.message);
        alert('Error uploading file. Please try again.');
        return;
      }

      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error:', error.message);
      alert('An error occurred. Please try again.');
    }
  };

  const handleImageUpload = async () => {
    if (!sid || !image) {
      alert('Please enter a SID and choose an image.');
      return;
    }

    // Check if the image has a JPG extension
    if (!image.name.toLowerCase().endsWith('.jpg')) {
      alert(`File ${image.name} is not a valid JPG.`);
      return;
    }

    // Check if the image already exists in the bucket
    const { data: existingImage, error: existingImageError } = await supabase.storage
      .from('stencils_img')
      .list(`${sid}.jpg`);

    if (existingImageError) {
      console.error(`Error checking existing image in bucket ${bucketName}:`, existingImageError.message);
      return null;
    }

    // If the image exists, remove it before uploading the new one
    if (existingImage) {
      const { error: removeError } = await supabase.storage
        .from('stencils_img')
        .remove(`${sid}.jpg`);

      if (removeError) {
        console.error(`Error removing existing image in bucket ${bucketName}:`, removeError.message);
        return null;
      }
    }

    // Upload the image to the Supabase storage bucket
    try {
      const imageName = `${sid}.jpg`;

      const { data, error } = await supabase.storage
        .from('stencils_img')
        .upload(imageName, image);

      if (error) {
        console.error('Error uploading image:', error.message);
        alert('Error uploading image. Please try again.');
        return;
      }

      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Error:', error.message);
      alert('An error occurred. Please try again.');
    }
  };

  const searchStencil = async () => {
    try {
      const { data, error } = await supabase
        .from('stencils')
        .select('*')
        .eq('sid', sid)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setStencil(data);
      } else {
        setStencil({
          title: '',
          cid: '',
          extras: '',
          website: '',
        });
      }
    } catch (error) {
      console.error('Error searching stencil:', error.message);
    }
  };

  const searchCategory = async () => {
    try {
      const { data, error } = await supabase
        .from('category')
        .select('cname')
        .eq('cid', cid)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setCategory(data.cname);
      } else {
        setCategory('');
      }
    } catch (error) {
      console.error('Error searching stencil:', error.message);
    }
  };

  const createStencil = async () => {
    try {
      const { data, error } = await supabase
        .from('stencils')
        .upsert([
          {
            sid,
            title: stencil.title,
            cid: stencil.cid,
            extras: stencil.extras,
            website: stencil.website,
            path: 'abcdef.stencil',
          },
        ]);

      if (error) {
        throw error;
      }

      alert('Stencil created successfully!');
      console.log('Stencil created successfully:', data);
    } catch (error) {
      console.error('Error creating stencil:', error.message);
    }
  };

  const createCategory = async () => {
    try {
      const { data, error } = await supabase
        .from('category')
        .upsert([
          {
            cid,
            cname: category,
          },
        ]);

      if (error) {
        throw error;
      }

      fetchCategories();

      alert('Category created successfully!');
      console.log('Category created successfully:', data);
    } catch (error) {
      console.error('Error creating category:', error.message);
    }
  };

  const updateStencil = async () => {
    try {
      const { data, error } = await supabase
        .from('stencils')
        .update({
          title: stencil.title,
          cid: stencil.cid,
          extras: stencil.extras,
          website: stencil.website,
        })
        .eq('sid', sid)
        .single();

      if (error) {
        throw error;
      }

      alert('Stencil updated successfully!');
      console.log('Stencil updated successfully:', data);
    } catch (error) {
      console.error('Error updating stencil:', error.message);
    }
  };

  const updateCategory = async () => {
    try {
      const { data, error } = await supabase
        .from('category')
        .update({
          cname: category,
        })
        .eq('cid', cid)
        .single();

      if (error) {
        throw error;
      }

      alert('Category updated successfully!');
      console.log('Category updated successfully:', data);
    } catch (error) {
      console.error('Error updating category:', error.message);
    }
  };

  const deleteStencil = async () => {
    try {
      const { error } = await supabase
        .from('stencils')
        .delete()
        .eq('sid', sid);

      if (error) {
        throw error;
      }

      alert('Stencil deleted successfully!');
      console.log('Stencil deleted successfully');
      // Reset stencil information after deletion
      setStencil({
        title: '',
        cid: '',
        extras: '',
        website: '',
        path: '',
      });

      fetchCategories();
    } catch (error) {
      console.error('Error deleting stencil:', error.message);
    }
  };

  const deleteCategory = async () => {
    try {
      const { error } = await supabase
        .from('category')
        .delete()
        .eq('cid', cid);

      if (error) {
        throw error;
      }

      alert('Category deleted successfully!');
      console.log('Category deleted successfully');
      // Reset stencil information after deletion
      setCategory('');
    } catch (error) {
      console.error('Error deleting category:', error.message);
    }
  };

  return (
    <AdminSignInPrompt>
      <Navbar total={total} finished={finished} stage={stage}/>

      <div>
        <div className={styles.border}>
          <h1 className="px-3 py-1 rounded-md bg-orange-500 text-white transition-colors font-bold">Stencil Update</h1>
          <div className={styles.inputContainer}>
            <label>Enter SID: </label>
            <input
              type="text"
              value={sid}
              onChange={(e) => setSid(e.target.value)}
            />
            <button onClick={searchStencil}>Search</button>
          </div>
          <div className={styles.inputContainer}>
            <label>Title: </label>
            <input
              type="text"
              value={stencil.title}
              onChange={(e) =>
                setStencil((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Category: </label>
            <select className={styles.select} value={stencil.cid} onChange={handleCategoryChange}>
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category.cid} value={category.cid}>
                  {category.cname}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.inputContainer}>
            <label>Extras: </label>
            <input
              type="text"
              value={stencil.extras}
              onChange={(e) =>
                setStencil((prev) => ({ ...prev, extras: e.target.value }))
              }
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Website: </label>
            <input
              type="text"
              value={stencil.website}
              onChange={(e) =>
                setStencil((prev) => ({ ...prev, website: e.target.value }))
              }
            />
          </div>
          <div className={styles.buttonContainer}>
            <button onClick={createStencil}>Create</button>
            <button onClick={updateStencil}>Update</button>
            <button onClick={deleteStencil}>Delete</button>
          </div>
        </div>

        <div className={styles.border}>
          <h1 className="px-3 py-1 rounded-md bg-orange-500 text-white transition-colors font-bold">Stencil PDF Upload</h1>
          <div className={styles.inputContainer}>
            <label>Enter SID: </label>
            <input type="text" value={sid} onChange={handleSidChange} />

            <label>Choose a PDF file: </label>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handlePDFUpload}>Upload PDF</button>
          </div>
        </div>

        <div className={styles.border}>
          <h1 className="px-3 py-1 rounded-md bg-orange-500 text-white transition-colors font-bold">Stencil Image Upload</h1>
          <div className={styles.inputContainer}>
          <label>Enter SID: </label>
            <input type="text" value={sid} onChange={handleSidChange} />

            <label>Choose a JPG file: </label>
            <input type="file" onChange={handleImageChange} />
            <button onClick={handleImageUpload}>Upload Image</button>
          </div>
        </div>

        <div className={styles.border}>
          <h1 className="px-3 py-1 rounded-md bg-orange-500 text-white transition-colors font-bold">Category Update</h1>
          <div className={styles.inputContainer}>
            <label>Enter CID: </label>
            <input
              type="text"
              value={cid}
              onChange={(e) => setCid(e.target.value)}
            />
            <button onClick={searchCategory}>Search</button>
          </div>
          <div className={styles.inputContainer}>
            <label>Category name: </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value )}
            />
          </div>
          <div className={styles.buttonContainer}>
            <button onClick={createCategory}>Create</button>
            <button onClick={updateCategory}>Update</button>
          </div>
        </div>
      </div>
    </AdminSignInPrompt>
  );
};

export default Stencils;

