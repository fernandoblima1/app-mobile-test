import {loadDigitalDocuments} from '../services/DigitalDocuments';
import {setItem} from './local-storage';

const DIGITAL_DOCUMENTS_KEY = '__digital_documents';
let digitalDocuments = [];

export async function loadDigitalDocument() {
  if (this.loading) {
    return;
  }
  this.setLoading(true);

  try {
    // if (this.downloading) {
    //   return;
    // }
    const documents = await loadDigitalDocuments(
      'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ2ZFBKbEE0WHlhVmd3c0dsZDZwYVhKWVFnbjJSY0JKXzBrMVdKdWZfSko0In0.eyJleHAiOjE3MDUwNzM3ODYsImlhdCI6MTcwNTA1OTM4NiwiYXV0aF90aW1lIjoxNzA0OTg4NjUzLCJqdGkiOiJmZjFiOGYzNS1kZWYyLTRjODgtODM0Ny0yMThhYjQ4M2Q5OTYiLCJpc3MiOiJodHRwczovL2Rldi5sb2dpbi5waS5nb3YuYnIvYXV0aC9yZWFsbXMvcGkiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZGUyODA1MjctNDhkMC00YzE2LTllMzQtYzhiYTZhNWExZjEyIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicG9ydGFsLXdlYiIsIm5vbmNlIjoiNDM5NmQ2ZTQtZjQ0Ni00MjZmLThhMzUtYmVhMmQ2MmViMmYzIiwic2Vzc2lvbl9zdGF0ZSI6IjA0Yzc5ZDRkLTZmNmYtNGQ3MC1iMDM5LTEwZmY4NGJhNGIyZSIsImFjciI6IjAiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cHM6Ly9ob21vbG9nLnBpZGlnaXRhbC5waS5nb3YuYnIiLCJodHRwczovL2Rldi5waWRpZ2l0YWwucGkuZ292LmJyIiwiKiIsImh0dHA6Ly9sb2NhbGhvc3Q6NzAwNCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib3BhbGEiLCJkZWZhdWx0LXJvbGVzLXBpIiwib2ZmbGluZV9hY2Nlc3MiLCJvdXJvIiwiY2lkYWRhby12YWxpZC11c2VyIiwidW1hX2F1dGhvcml6YXRpb24iLCJkZXRyYW4tdmFsaWQtdXNlciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJzaWQiOiIwNGM3OWQ0ZC02ZjZmLTRkNzAtYjAzOS0xMGZmODRiYTRiMmUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInJvbGVzIjpbIm9wYWxhIiwiZGVmYXVsdC1yb2xlcy1waSIsIm9mZmxpbmVfYWNjZXNzIiwib3VybyIsImNpZGFkYW8tdmFsaWQtdXNlciIsInVtYV9hdXRob3JpemF0aW9uIiwiZGV0cmFuLXZhbGlkLXVzZXIiXSwibmFtZSI6IkZSQU5DSVNDTyBIRUxJRUxTT04gTUFDRURPIERFIFNPVVNBIiwiZ3JvdXBzIjpbXSwicHJlZmVycmVkX3VzZXJuYW1lIjoiMDQ1NTExMDUzMDkiLCJnaXZlbl9uYW1lIjoiRlJBTkNJU0NPIiwiZGF0YU5hc2NpbWVudG8iOiIyMi8wMy8xOTkxIiwiZmFtaWx5X25hbWUiOiJIRUxJRUxTT04gTUFDRURPIERFIFNPVVNBIiwiY2F0YWxvZ19mYXZvcml0ZSI6IltcInJlbm92YXItcGVybWlzc2FvLWludGVybmFjaW9uYWwtcGFyYS1kaXJpZ2lyLShwaWQpXCIsXCJzb2xpY2l0YXItc29jb3Jyby1pbWVkaWF0by0oYm90YW8tZG8tcGFuaWNvKVwiLFwiY29uc3VsdGFyLWZyZXF1ZW5jaWEtZXNjb2xhclwiLFwiY29uc3VsdGFyLW1ldXMtdmVpY3Vsb3NcIixcImFwcC1taW5oYS1jbmhcIl0iLCJwaWN0dXJlIjoiIiwiZW1haWwiOiJhcm5hbGRvQGhvdG1haWwuY29tIiwibm9tZU1hZSI6IklSSVNMRU5FIFNJTFZBIE1BQ0VETyJ9.K-U8EVDwr5R-wmsDxdGzg44YTYwCcE3kcycsV-DfFgJI5TDW8jr6u9-GcTpWeZTNQY6qpMAQuxh-FNS9IVsk_rVYPMAmZDgq4s5qccYP_dFwlAxm425AolKePkq9O0-5mrsoKNG9FqHRoz07TiwBkOKbVjMbl5rYj5pGr4xk39zQDXRO7ajss_p92HLdAX4mznJh98aBqRG_LH3Cbh71bf6Wvq71ceY_jVxIfhEEDgQygH_ZNVa24hDNtHvaG_Xl8CpHsRtbp61771OTCh2g_z3HeWe8VQen5WiP5HlK0bNSazMpn-G-pXlcVNshdo7T_Dy1zaHGlhnG50IgGrQHjg',
    );
    console.log('Documents: ' + documents);
    return documents;
    // if (!documents?.length) {
    //   await Promise.all([]).finally(async () => {
    //     this.setDigitalDocuments([]);
    //     await setItem(DIGITAL_DOCUMENTS_KEY, []);
    //     this.downloading = false;
    //     this.setLoading(false);
    //   });
    //   return;
    // }
    // this.downloading = true;
    // (documents || []).forEach(doc => this.cacheAndDownload(doc));
  } catch (error) {
    console.log(`Error while try get digital documents: ${error}`);
  } finally {
    this.setLoading(false);
  }
}

export async function cacheAndDownload(document) {
  try {
    const foundDoc = this.digitalDocuments.find(
      digitalDocument => digitalDocument.id === document.id,
    );
    if (!foundDoc) {
      let paths = [];
      try {
        paths = await this.downloadFiles(document);
      } catch (error) {
        console.log(`Error while try download files: ${error}`);
      }

      if (paths.length) {
        paths = paths?.sort((a, b) => a.index - b.index);
        await this.addDigitalDocument({...document, fileLocalPaths: paths});
      }
    } else {
      const hasFile =
        document.files.filter(file =>
          foundDoc.files.find(_file => _file.path === file.path),
        ).length > 0;

      if (!hasFile && foundDoc.fileLocalPaths?.length) {
        await this.reloadDocument(document, foundDoc.fileLocalPaths);
      }
    }
  } catch (error) {
    console.log(`Error while try cacheAndDownload: ${error}`);
  } finally {
    this.downloading = false;
  }
}

export async function downloadFiles(document) {
  const paths = [];
  const downloadFilesPromises = document.files.map(async (file, index) => {
    const fileExtension = this.getFileExtensionFromMimeType(file.mimeType);

    const path = await this.downloadDocument(
      document.id,
      file.path,
      fileExtension,
    );
    paths.push({
      path,
      mimeType: file.mimeType,
      name: file.name,
      index,
    });
  });
  await Promise.all(downloadFilesPromises);
  return paths;
}

export async function reloadDocument(document, files) {
  if (this.loading) {
    return;
  }
  let newPaths = [];

  this.setLoading(true);
  try {
    newPaths = await this.downloadFiles(document);
  } catch (error) {
    console.log(`Error while try download files for reloadDocument: ${error}`);
  } finally {
    this.setLoading(false);
  }
  if (!newPaths.length) {
    return;
  }
  const index = this.digitalDocuments.findIndex(
    foundDocument => foundDocument.id === document.id,
  );
  this.digitalDocuments[index].fileLocalPaths = newPaths;
  await setItem(DIGITAL_DOCUMENTS_KEY, this.digitalDocuments);
  // await deleteFiles(files.map(file => file.path));
}

export async function addDigitalDocument(document) {
  this.digitalDocuments.push(document);
  await setItem(DIGITAL_DOCUMENTS_KEY, this.digitalDocuments);
}
