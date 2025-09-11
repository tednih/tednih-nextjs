"use client";
import Image from "next/image";
import { useEffect, useState, React } from "react";
import { Icon } from "@iconify/react";
import { getSession } from "next-auth/react"; // pakai versi client
import { PencilIcon, PlusIcon } from "@heroicons/react/solid";
import UpdateProfileForm from "../admin/about/profile/[id]/page";
import { fetchData } from "next-auth/client/_utils";
import SkillForm from "../admin/about/skills/inputSkills/page";
import UpdateSkillForm from "../admin/about/skills/[id]/page";

const CardAbout = () => {
  const [session, setSession] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showAddSkillForm, setShowAddSkillForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showEditSkillForm, setShowEditSkillForm] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skills, setSkills] = useState([]);
  const [profile, setProfile] = useState(null);

  const handleEdit = (id) => {
    setSelectedProfile(id);
    setShowEditForm(true);
  };
  const handleEditSkill = (id) => {
    setSelectedSkill(id);
    setShowEditSkillForm(true);
  };

  const handleAddSkill = () => {
    setShowAddSkillForm(true);
  };

  useEffect(() => {
    const fetchSession = async () => {
      const s = await getSession(); // ini versi client-side
      setSession(s);
    };

    fetchSession();
  }, []);

  const fetchData = async () => {
    try {
      const [skillsRes, profileRes] = await Promise.all([
        fetch("/api/about/aboutSkills"),
        fetch("/api/about/aboutProfile"),
      ]);

      const skillsData = await skillsRes.json();
      const profileData = await profileRes.json();

      setSkills(skillsData.skills);
      setProfile(profileData.profile[0]);
    } catch (err) {
      console.error("Gagal fetch data:", err);
    }
  };

  // fetch pertama kali
  useEffect(() => {
    fetchData();
  }, []);

  // kalau sukses update → refetch ulang
  useEffect(() => {
    if (isSuccess) {
      setShowEditForm(false);
      setShowEditSkillForm(false);
      // setShowAddSkillForm(false);
      fetchData();
      setIsSuccess(false);
    }
  }, [isSuccess]);

  return (
    <div className="lg:flex block justify-between m-auto sm:m-5 space-y-5 lg:space-y-0 xl:space-y-0">
      <div className="animate__animated animate__backInUp card-glass lg:max-w-[800px] md:max-w-[500px] max-w-[430px] m-auto items-center gap-4 p-10 ">
        {profile ? (
          <Image
            alt=""
            src={profile.foto}
            width={300}
            height={300}
            className="w-full h-full object-cover sm:h-full rounded-xl"
          />
        ) : (
          <p className="text-gray-400 italic">Loading...</p>
        )}
        {session ? (
          <button
            onClick={() => handleEdit(profile._id)} // panggil fungsi untuk buka form edit
            className="absolute top-0 right-0 bg-button dark:bg-darkbutton hover:bg-button/90 dark:hover:bg-darkbutton/90 p-1 rounded-full"
            title="Edit Profile"
          >
            <PencilIcon className="h-5 w-5 text-primary dark:text-darkprimary" />
          </button>
        ) : (
          <></>
        )}
      </div>
      <div className="m-auto mb-5">
        <div className="animate__animated animate__backInRight card-glass xl:max-w-[750px] lg:max-w-[380px] md:max-w-[500px] max-w-[430px] m-auto items-center gap-4 p-10">
          <h2 className="text-2xl font-bold text-text dark:text-darktext md:text-3xl">
            About Me
          </h2>
          {profile ? (
            <p className="text-text dark:text-gray-300 md:mt-4 md:block text-justify mt-3">
              {profile.deskripsi}
            </p>
          ) : (
            <p className="text-gray-400 italic">Loading...</p>
          )}
          {session ? (
            <button
              onClick={() => handleEdit(profile._id)} // panggil fungsi untuk buka form edit
              className="absolute top-0 right-0 bg-button dark:bg-darkbutton hover:bg-button/90 dark:hover:bg-darkbutton/90 p-1 rounded-full"
              title="Edit Profile"
            >
              <PencilIcon className="h-5 w-5 text-primary dark:text-darkprimary" />
            </button>
          ) : (
            <></>
          )}
        </div>
        <div className="mt-5 animate__animated animate__backInRight card-glass xl:max-w-[750px] lg:max-w-[380px] md:max-w-[500px] max-w-[430px] m-auto items-center gap-4 p-10 ">
          <h2 className="text-2xl font-bold text-text dark:text-darktext md:text-3xl">
            Skills
          </h2>
          <div className="grid grid-cols-5 grid-rows-3 gap-4 place-items-center mt-3">
            {skills.map((skill) => (
              <div
                key={skill._id}
                className="relative group h-12 w-12 text-bottom items-center"
              >
                <Icon
                  icon={skill.icon}
                  width="50"
                  height="38"
                  // className="text-center"
                />
                <span className="absolute left-1/2 -translate-x-1/2 mt-2 w-max px-3 py-1 text-xs text-text dark:text-darktext card-glass opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {skill.name}
                </span>
                {session ? (
                  <button
                    onClick={() => handleEditSkill(skill._id)} // panggil fungsi untuk buka form edit
                    className="absolute top-0 right-0 bg-button dark:bg-darkbutton hover:bg-button/90 dark:hover:bg-darkbutton/90 p-1 rounded-full z-10"
                    title="Edit Skill"
                  >
                    <PencilIcon className="h-3 w-3 text-primary dark:text-darkprimary" />
                  </button>
                ) : (
                  <></>
                )}
              </div>
            ))}
            {session ? (
              <button
                onClick={() => setShowAddSkillForm(true)} // panggil fungsi untuk buka form add
                className="absolute top-0 right-0 bg-button dark:bg-darkbutton hover:bg-button/90 dark:hover:bg-darkbutton/90 p-1 rounded-full"
                title="Add Skill"
              >
                <PlusIcon className="h-5 w-5 text-primary dark:text-darkprimary" />
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      {/* EDIT Profile */}
      {showEditForm && selectedProfile && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur">
          <div className="relative bg-primary dark:bg-darkprimary p-6 rounded-lg max-w-md w-full m-auto shadow-lg">
            <button
              className="absolute top-4 right-4 text-lg text-button hover:text-button/50"
              onClick={() => setShowEditForm(false)}
            >
              ✕
            </button>
            <p className="text-xl text-headline dark:text-darkheadline mb-4">
              Edit Profile
            </p>
            <UpdateProfileForm
              profileId={selectedProfile}
              onLoadingChange={setIsSubmitting}
              onSuccess={setIsSuccess}
            />
          </div>
        </div>
      )}

      {/* EDIT Skill */}
      {showEditSkillForm && selectedSkill && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur">
          <div className="relative bg-primary dark:bg-darkprimary p-6 rounded-lg max-w-md w-full m-auto shadow-lg">
            <button
              className="absolute top-4 right-4 text-lg text-button hover:text-button/50"
              onClick={() => setShowEditSkillForm(false)}
            >
              ✕
            </button>
            <p className="text-xl text-headline dark:text-darkheadline mb-4">
              Edit Skill
            </p>
            <UpdateSkillForm
              skillId={selectedSkill}
              onLoadingChange={setIsSubmitting}
              onSuccess={setIsSuccess}
            />
          </div>
        </div>
      )}

      {/* ADD Skills */}
      {showAddSkillForm && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur">
          <div className="relative bg-primary dark:bg-darkprimary p-6 rounded-lg max-w-md w-full m-auto shadow-lg">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-lg text-button hover:text-button/50"
              onClick={() => setShowAddSkillForm(false)}
            >
              ✕
            </button>

            {/* Form */}
            <p className="text-xl text-headline dark:text-darkheadline mb-4">
              Input Skills
            </p>
            <SkillForm onSuccess={setIsSuccess} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CardAbout;
