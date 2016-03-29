package net.deviceone.helper;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

import org.apache.commons.io.FileUtils;

public class FileHelper {
	/**
	 * 获取文件的内容，返回字符串
	 * 
	 * @param filePath
	 * @return
	 */
	public static String getUTF8FileContent(String filePath, ILog log) throws Exception {
		LogHelper.info(log, "read content from file:" + filePath);
		File file = new File(filePath);
		String content = "";
		if (file.exists())
			content = FileUtils.readFileToString(file, "UTF-8");
		if (content.length() < 500)
			LogHelper.info(log, "return content:" + content);
		else
			LogHelper.info(log, "内容太多了，懒得显示了...");
		return content;
	}

	public static void writeContentToUTFFile(String data, String filePath, ILog log) throws Exception {
		if (data.length() < 500)
			LogHelper.info(log, "write data:" + data + ", to file:" + filePath);
		else
			LogHelper.info(log, "write data:内容太多了，懒得显示了..");
		FileUtils.write(new File(filePath), data, "UTF-8");
	}

	public static void appendContent(String data, String filePath, ILog log) throws Exception {
		LogHelper.info(log, "append data" + data + ", to file:" + filePath);
		FileUtils.write(new File(filePath), data, "UTF-8", true);
	}

	public static void copyFolder(String src, String dest, ILog log) throws Exception {
		LogHelper.info(log, "copy files and subfolder from folder :" + src + " to :" + dest);
		FileUtils.copyDirectory(new File(src), new File(dest));
	}

	public static void copyFile(String src, String dest, ILog log) throws Exception {
		LogHelper.info(log, "copy file from:" + src + " to :" + dest);
		File srcF = new File(src);
		if(!srcF.exists()){
			LogHelper.debug(log,  src + " is not exist");
		}else
			FileUtils.copyFile(srcF, new File(dest));
	}

	public static boolean compareContent(String file1, String file2, ILog log) throws Exception {
		LogHelper.info(log, "compare content of two file,file1:" + file1 + "and file2:" + file2);
		boolean isequal = FileUtils.contentEquals(new File(file1), new File(file2));
		LogHelper.info(log, "compare result is:" + isequal);
		return isequal;
	}

	/**
	 * 获取file的内容
	 * 
	 * @param filePath
	 * @return
	 */
	public static byte[] getFileContent(String filePath) throws Exception {
		File file = new File(filePath);
		if (!file.exists())
			return null;
		return FileUtils.readFileToByteArray(file);
	}

	public static void deleteFolder(String filePath, ILog log) throws Exception {
		File file = new File(filePath);
		if (file.exists() && file.isDirectory()) {
			LogHelper.info(log, "delete folder:" + filePath);
			FileUtils.deleteDirectory(file);
		}
	}

	public static void mkdir(String filePath, boolean isDel, ILog log) throws Exception {
		if (isDel)
			deleteFolder(filePath, log);
		File folder = new File(filePath);
		if (!folder.exists()) {
			LogHelper.info(log, "mk dir:" + filePath);
			folder.mkdirs();
		}
	}

	public static void deleteFile(String filePath, ILog log) throws Exception {
		LogHelper.info(log, "delete file:" + filePath);
		File file = new File(filePath);
		if (file.exists() && file.isFile())
			file.delete();
	}

	static public void unzipFile(String zipFileFullPathName, String targetDirectory, ILog log) throws Exception {
		File targetDir = new File(targetDirectory);
		if (!targetDir.exists())
			targetDir.mkdirs();
		LogHelper.info(log, "unzip file:" + zipFileFullPathName + ", to folder:" + targetDirectory);
		ZipInputStream in = null;
		try {
			in = new ZipInputStream(new FileInputStream(zipFileFullPathName));
			ZipEntry z = in.getNextEntry();
			while (z != null) {
				String name = z.getName();
				if (name.endsWith("\\") || name.endsWith("/")) {
					name = name.substring(0, name.length() - 1);
					File f = new File(targetDirectory + "/" + name);
					f.mkdir();
				} else {
					String targetName = targetDirectory + "/" + z.getName().replace("\\", "/");
					File f = new File(targetName);

					int index = targetName.lastIndexOf("\\");
					if (index != -1) {
						File df = new File(targetName.substring(0, index));
						df.mkdirs();
					}
					index = targetName.lastIndexOf("/");
					if (index != -1) {
						File df = new File(targetName.substring(0, index));
						df.mkdirs();
					}

					f.createNewFile();
					FileOutputStream out = new FileOutputStream(f);
					int b;
					while ((b = in.read()) != -1) {
						out.write(b);
					}
					out.close();
				}
				z = in.getNextEntry();
			}
		} catch (Exception e) {
			throw e;
		} finally {
			if (in != null)
				in.close();
		}
	}

	/** 移除UTF-8的BOM */
	public static void removeUTFBOM(File file, ILog log) throws Exception {
		byte[] bs = FileUtils.readFileToByteArray(file);
		if (bs[0] == -17 && bs[1] == -69 && bs[2] == -65) {
			byte[] nbs = new byte[bs.length - 3];
			System.arraycopy(bs, 3, nbs, 0, nbs.length);
			FileUtils.writeByteArrayToFile(file, nbs);
			LogHelper.info(log, "Remove BOM: " + file);
		}
	}

	public static void zip(String inputFileName, String zipFileName, ILog log) throws Exception {
		log.h("zip folder :" + inputFileName + "to zip file:" + zipFileName);
		if (!new File(inputFileName).exists())
			return;
		zip(zipFileName, new File(inputFileName));
	}

	private static void zip(String zipFileName, File inputFile) throws Exception {
		ZipOutputStream out = new ZipOutputStream(new FileOutputStream(zipFileName));
		zip(out, inputFile, "");
		out.close();
	}

	private static void zip(ZipOutputStream out, File f, String base) throws Exception {
		if (f.isDirectory()) { // 判断是否为目录
			File[] fl = f.listFiles();
			// out.putNextEntry(new org.apache.tools.zip.ZipEntry(base + "/"));
			out.putNextEntry(new ZipEntry(base + "/"));
			base = base.length() == 0 ? "" : base + "/";
			for (int i = 0; i < fl.length; i++) {
				zip(out, fl[i], base + fl[i].getName());
			}
		} else { // 压缩目录中的所有文件
			// out.putNextEntry(new org.apache.tools.zip.ZipEntry(base));
			out.putNextEntry(new ZipEntry(base));
			FileInputStream in = new FileInputStream(f);
			int b;
			System.out.println(base);
			while ((b = in.read()) != -1) {
				out.write(b);
			}
			in.close();
		}
	}
}
